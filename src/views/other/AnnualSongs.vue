<template>
  <div class="songs-page">
    <div class="songs-hero">
      <h1 class="songs-title">
        <i class="fa fa-music"></i>
        年度专辑分享
      </h1>
      <p class="songs-desc">这些旋律陪伴了这一年</p>
      <button
        v-if="!isPlaying"
        class="play-btn"
        @click="togglePlay"
      >
        <i :class="isPlaying ? 'fa fa-pause' : 'fa fa-play'"></i>
        {{ isPlaying ? '暂停 BGM' : '播放 BGM' }}
      </button>
    </div>

    <div class="album-grid">
      <div
        v-for="album in albums"
        :key="album.id"
        class="album-card"
        :style="{ animationDelay: `${album.id * 0.1}s` }"
      >
        <div class="album-cover">
          <img :src="`${baseUrl}music/images/album${album.id}.${album.ext}`" :alt="album.name" loading="lazy" />
        </div>
        <p class="album-name">{{ album.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const baseUrl = import.meta.env.BASE_URL
const isPlaying = ref(false)
let audio = null

const albums = [
  { id: 1, name: '每到夜里我就很饿', ext: 'jpg' },
  { id: 2, name: '神经志', ext: 'jpg' },
  { id: 3, name: "I'm OK", ext: 'png' },
  { id: 4, name: '梦想家', ext: 'jpg' },
  { id: 5, name: '卡拉OK.台北.我', ext: 'jpg' },
  { id: 6, name: '幻想乐园 Fantasyland', ext: 'png' },
  { id: 7, name: 'アンサンブル・プレイ', ext: 'jpg' },
  { id: 8, name: '変身のレシピ', ext: 'jpg' },
  { id: 9, name: '瘦子', ext: 'jpg' },
]

function togglePlay() {
  if (!audio) {
    audio = new Audio(`${baseUrl}music/audio/林俊杰愿与愁.mp3`)
    audio.loop = true
  }
  if (isPlaying.value) {
    audio.pause()
    isPlaying.value = false
  } else {
    audio.play().then(() => {
      isPlaying.value = true
    }).catch(err => {
      console.error('播放失败:', err)
      alert('音频播放失败，请检查浏览器自动播放策略')
    })
  }
}

onUnmounted(() => {
  if (audio) {
    audio.pause()
    audio = null
  }
})
</script>

<style scoped>
.songs-page {
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: var(--spacing-xl);
}

.songs-hero {
  text-align: center;
  padding: var(--spacing-xl) 0;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-xl);
  color: white;
}

.songs-title {
  font-size: var(--font-size-xxl);
  margin-bottom: var(--spacing-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.songs-desc {
  font-size: var(--font-size-md);
  opacity: 0.9;
  margin-bottom: var(--spacing-md);
}

.play-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-xl);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: var(--radius-round);
  cursor: pointer;
  font-size: var(--font-size-sm);
  backdrop-filter: blur(4px);
  transition: all var(--transition-fast);
}

.play-btn:hover {
  background: rgba(255, 255, 255, 0.35);
}

.album-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.album-card {
  background: var(--color-bg-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.album-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-md);
}

.album-cover {
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: var(--spacing-sm);
}

.album-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.album-name {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  font-weight: 500;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .album-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }

  .songs-title {
    font-size: var(--font-size-xl);
  }
}

@media (max-width: 400px) {
  .album-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
