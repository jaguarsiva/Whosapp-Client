
import notificationType from "@/types/notificationType";

export interface notificationState {
    notifications: notificationType[]
}

var nextId = 1;
export default {
    namespaced: true,
    state(): notificationState {
		return {
			notifications: [],
		}
	},
    mutations: {
        PUSH(state: notificationState, notification: notificationType) {
			state.notifications.push({
				...notification,
				id: nextId++
			});
		},
		DELETE(state: notificationState, id: number) {
			state.notifications = state.notifications.filter(
				notification => notification.id !== id
			);
		}
    },
    actions: {
        add({ commit }, notification: notificationType) {
			commit('PUSH', notification);
		},
		remove({ commit }, id: number) {
			commit('DELETE', id);
		}
    }
}