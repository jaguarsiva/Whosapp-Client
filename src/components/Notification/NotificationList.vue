<template>
<aside class="not__list">
    <NotificationItem
        v-for="(notification, index) in notifications"
        :key="index"
        :notification="notification"
    />
</aside>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue';
import NotificationItem from '@/components/Notification/NotificationItem.vue';

export default defineComponent({
    components: {
        NotificationItem
    },
    setup() {
        const store = useStore();
        const notifications = computed( () => store.state.notification.notifications );

        return {
            notifications
        }
    }
})
</script>

<style lang="scss" scoped>

.not__list {
    position: fixed;
    top: 30px;
    right: 20px;
    z-index: 10;
    gap: 20px;
    width: 350px;
    pointer-events: none;
    overflow: hidden;
}

</style>