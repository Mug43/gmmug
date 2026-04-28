<template>
  <div class="campus-map-page">
    <h2 class="page-title"><i class="fa fa-map-marker-alt"></i> 校园地图</h2>
    <p class="page-desc">浙江水利水电学院 · {{ currentCampus.name }}</p>

    <!-- 校区切换 -->
    <div class="campus-switcher">
      <button
        v-for="campus in campuses" :key="campus.id"
        :class="['campus-btn', { active: activeCampus === campus.id }]"
        @click="switchCampus(campus.id)"
      >
        <i class="fa fa-map-pin"></i> {{ campus.name }}
      </button>
    </div>

    <!-- 地图容器 -->
    <div class="map-wrapper">
      <div id="campus-map" class="map-container"></div>
    </div>

    <!-- 地点列表 -->
    <section class="locations">
      <h3>📍 校园地标</h3>
      <div class="location-grid">
        <div
          v-for="loc in currentCampus.locations" :key="loc.name"
          class="location-card"
          @click="focusLocation(loc)"
        >
          <i :class="loc.icon"></i>
          <span>{{ loc.name }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const apiKey = ref('ea8cf1b3e115bf4149fee972d8c70d83')

let map = null
let markers = []

const activeCampus = ref('qiantang')

// 两个校区的数据
const campuses = ref([
  {
    id: 'qiantang',
    name: '钱塘校区',
    center: [120.3735, 30.3170],
    zoom: 17,
    locations: [
      { name: '南大门', lng: 120.3741, lat: 30.3155, icon: 'fa fa-door-open' },
      { name: '图书馆', lng: 120.3735, lat: 30.3175, icon: 'fa fa-book' },
      { name: '教学楼A', lng: 120.3725, lat: 30.3168, icon: 'fa fa-school' },
      { name: '教学楼B', lng: 120.3745, lat: 30.3170, icon: 'fa fa-school' },
      { name: '学生食堂', lng: 120.3730, lat: 30.3160, icon: 'fa fa-utensils' },
      { name: '体育馆', lng: 120.3755, lat: 30.3180, icon: 'fa fa-basketball-ball' },
      { name: '学生宿舍', lng: 120.3720, lat: 30.3185, icon: 'fa fa-bed' },
      { name: '行政楼', lng: 120.3750, lat: 30.3165, icon: 'fa fa-building' },
    ]
  },
  {
    id: 'nanxun',
    name: '南浔校区',
    center: [120.441505, 30.837023],
    zoom: 17,
    locations: [
      { name: '校区大门', lng: 120.441505, lat: 30.837023, icon: 'fa fa-door-open' },
      { name: '教学楼', lng: 120.4420, lat: 30.8375, icon: 'fa fa-school' },
      { name: '图书馆', lng: 120.4410, lat: 30.8365, icon: 'fa fa-book' },
      { name: '学生食堂', lng: 120.4425, lat: 30.8380, icon: 'fa fa-utensils' },
      { name: '学生宿舍', lng: 120.4400, lat: 30.8385, icon: 'fa fa-bed' },
    ]
  }
])

const currentCampus = computed(() =>
  campuses.value.find(c => c.id === activeCampus.value)
)

// 加载高德地图 JS API
function loadAmapScript() {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${apiKey.value}`
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// 更新地图标记点
function updateMarkers() {
  if (!map) return
  // 清除旧标记
  map.remove(markers)
  markers = []
  // 添加新标记
  currentCampus.value.locations.forEach(loc => {
    const marker = new window.AMap.Marker({
      position: [loc.lng, loc.lat],
      title: loc.name,
      label: {
        content: loc.name,
        offset: new window.AMap.Pixel(0, -5),
        direction: 'top',
      },
    })
    marker.on('click', () => {
      map.setZoomAndCenter(18, [loc.lng, loc.lat])
    })
    markers.push(marker)
  })
  map.add(markers)
}

// 切换校区
function switchCampus(campusId) {
  activeCampus.value = campusId
  if (map) {
    const campus = campuses.value.find(c => c.id === campusId)
    map.setZoomAndCenter(campus.zoom, campus.center)
    updateMarkers()
  }
}

// 初始化地图
async function initMap() {
  if (!apiKey.value || apiKey.value === 'YOUR_AMAP_KEY') return

  try {
    await loadAmapScript()

    const campus = currentCampus.value
    map = new window.AMap.Map('campus-map', {
      center: campus.center,
      zoom: campus.zoom,
      mapStyle: 'amap://styles/fresh',
      viewMode: '2D',
    })

    map.addControl(new window.AMap.Scale())
    map.addControl(new window.AMap.ToolBar({ position: 'RT' }))

    updateMarkers()
  } catch (err) {
    console.error('地图加载失败:', err)
  }
}

// 点击地点卡片 → 地图聚焦
function focusLocation(loc) {
  if (map) {
    map.setZoomAndCenter(18, [loc.lng, loc.lat])
  }
}

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map) {
    map.destroy()
    map = null
  }
})
</script>

<style scoped>
.campus-map-page {
  max-width: 900px;
  margin: 0 auto;
}

.page-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-primary);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xs);
}

.page-desc {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-md);
}

/* 校区切换 */
.campus-switcher {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.campus-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 2px solid var(--color-border-light);
  border-radius: 0;
  background: var(--color-bg-white);
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
}

.campus-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.campus-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
  font-weight: 600;
  box-shadow: var(--shadow-brand);
}

/* 地图容器 */
.map-wrapper {
  border-radius: 0;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-xl);
}

.map-container {
  width: 100%;
  height: 500px;
  background: var(--color-bg);
}

/* 地点列表 */
.locations h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  color: var(--color-text);
}

.location-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}

.location-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-bg-white);
  border-radius: 0;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: var(--font-size-sm);
}

.location-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  color: var(--color-primary);
}

.location-card i {
  color: var(--color-primary);
  width: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .map-container {
    height: 350px;
  }
  .location-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .campus-switcher {
    flex-wrap: wrap;
  }
}
</style>
