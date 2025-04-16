<template>
  <div>
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
    <div class="flex lg:hidden">
      <Navbar />
    </div>
    <div class="lg:grid lg:grid-cols-12">
      <div class="hidden lg:flex col-span-1">
        <Sidebar />
      </div>
      <div class="col-span-11">
        <slot />
      </div>
    </div>
  </div>
</template>
