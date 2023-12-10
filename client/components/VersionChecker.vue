<template>
	<div id="version-checker" :class="[store.state.versionStatus]">
		<p>Check for updates yourself you lazy bum</p>
	</div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue";
import socket from "../js/socket";
import {useStore} from "../js/store";

export default defineComponent({
	name: "VersionChecker",
	setup() {
		const store = useStore();

		const checkNow = () => {
			store.commit("versionData", null);
			store.commit("versionStatus", "loading");
			socket.emit("changelog");
		};

		onMounted(() => {
			if (!store.state.versionData) {
				checkNow();
			}
		});

		return {
			store,
			checkNow,
		};
	},
});
</script>
