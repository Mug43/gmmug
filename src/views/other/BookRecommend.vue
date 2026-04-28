<template>
  <div class="book-page">
    <h1><i class="fa fa-bookmark"></i> 好书推荐</h1>
    <p class="desc">精选数学物理、计算机和文学类好书，每本都值得反复品读。</p>

    <div v-for="(group, gi) in bookGroups" :key="gi" class="book-group">
      <h2><i :class="group.icon"></i> {{ group.name }}</h2>
      <div class="book-grid">
        <div
          v-for="(book, bi) in group.books"
          :key="bi"
          class="book-card"
          :style="{ animationDelay: `${bi * 0.1}s` }"
        >
          <div class="book-cover">
            <img v-if="book.cover" :src="book.cover" :alt="book.title + '封面'" @error="(e) => e.target.parentElement.classList.add('no-img')" />
            <i v-else class="fa fa-book-open"></i>
          </div>
          <div class="book-info">
            <h3>{{ book.title }}</h3>
            <p class="book-author">{{ book.author }}</p>
            <p class="book-reason">{{ book.reason }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const bookGroups = [
  {
    name: '数学物理',
    icon: 'fa fa-square-root-alt',
    books: [
      { title: '线性代数及其应用（原书第6版）', author: 'David C. Lay 等', reason: '线性代数的经典教材，深入浅出', cover: '/cover/laaia.jpg' },
      { title: '矩阵分析', author: 'Roger A. Horn', reason: '矩阵理论的权威参考', cover: '/cover/ma.jpg' },
      { title: '数值分析', author: 'Timothy Sauer', reason: '数值计算方法的全面介绍', cover: '/cover/szfx.jpg' },
      { title: '普林斯顿微积分读本', author: 'Adrian Banner', reason: '微积分入门与进阶的绝佳伴侣', cover: '/cover/plsd.jpg' },
      { title: '概率论与数理统计', author: '茆诗松 等', reason: '概率论经典教材', cover: '/cover/MAOSHU.jpg' },
      { title: '数学物理方法', author: '梁昆淼', reason: '理工科必修的数学物理方法', cover: '/cover/sw.jpg' }
    ]
  },
  {
    name: '计算机',
    icon: 'fa fa-laptop-code',
    books: [
      { title: 'C Primer Plus', author: 'Stephen Prata', reason: 'C语言入门经典', cover: '/cover/CPP.jpg' },
      { title: 'Python编程从入门到实践', author: 'Eric Matthes', reason: 'Python入门最佳实践指南', cover: '/cover/python.jpg' }
    ]
  },
  {
    name: '文学',
    icon: 'fa fa-feather-alt',
    books: [
      { title: '文心', author: '夏丏尊 / 叶圣陶', reason: '语文学习的经典读物', cover: '/cover/wx.jpg' }
    ]
  }
]
</script>

<style scoped>
.book-page {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

h1 {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.desc {
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xl);
}

.book-group {
  margin-bottom: var(--spacing-xl);
}

.book-group h2 {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-lg);
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-primary-bg);
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-md);
}

.book-card {
  display: flex;
  gap: var(--spacing-md);
  background: var(--color-bg-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.book-cover {
  flex-shrink: 0;
  width: 80px;
  height: 110px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-xl);
  overflow: hidden;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-cover.no-img img {
  display: none;
}

.book-cover.no-img::after {
  content: '\f518';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}

.book-info h3 {
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-xs);
}

.book-author {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
}

.book-reason {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>
