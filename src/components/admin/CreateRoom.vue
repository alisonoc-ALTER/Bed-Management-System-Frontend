<template>
    <cv-modal
        :visible="showModal"
        :auto-hide-off="true"
        @primary-click="createRoom"
        @secondary-click="showModal = false"
    >
        <template slot="title">Create Room</template>
        <template slot="content">
            <cv-text-input
                v-model="newRoom.description"
                label="Description"
            ></cv-text-input>
            <cv-select v-model="newRoom.gender" label="Gender">
                <cv-select-option
                    v-for="gender in genders"
                    :key="gender"
                    :value="gender"
                >
                    {{ gender }}
                </cv-select-option>
            </cv-select></template
        >
        <template slot="primary-button">Create</template>
        <template slot="secondary-button">Cancel</template>
    </cv-modal>
</template>

<script>
export default {
    name: "CreateRoom",
    data() {
        return {
            newRoom: {
                description: "",
                gender: "",
                ward_id: 0,
                created_at: undefined
            },
            showModal: false,
            genders: ["All", "Male", "Female"]
        };
    },
    props: {
        roomId: {
            type: String,
            required: false
        }
    },
    methods: {
        async createRoom() {
            this.newRoom.created_at = new Date();
            this.newRoom.ward_id = this.wardId;
            const roomData = this.newRoom;
            try {
                const response = await fetch("/api/rooms/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    },
                    body: JSON.stringify(roomData)
                });

                if (response.ok) {
                    this.$store.commit("ADD_NOTIFICATION", {
                        kind: "success",
                        title: "Room created successfully",
                        caption: `Room "${roomData.description}" has been created successfully`
                    });
                    const newRoom = await response.json();
                    this.$emit("room", newRoom);
                } else {
                    this.$store.commit("ADD_NOTIFICATION", {
                        kind: "error",
                        title: "Failed to create room",
                        caption: `Failed to create room "${roomData.description}"`
                    });
                    throw new Error("Failed to create room");
                }
                this.newRoom = {
                    description: "",
                    gender: "",
                    ward_id: 0,
                    created_at: undefined
                };
            } catch (err) {
                console.error(err);
            }
            this.showModal = false;
        }
    },
    watch: {
        roomId(value) {
            if (value === "999999") {
                this.showModal = true;
            } else {
                this.showModal = false;
            }
        }
    },
    computed: {
        wardId() {
            return this.$route.params.wardId;
        }
    }
};
</script>

<style scoped>
.bx--modal-close {
    display: none;
}
</style>
