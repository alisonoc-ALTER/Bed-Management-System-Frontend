<template>
    <div id="usersTransferRequests">
        <combined-transfer-tables :userSpecific="true" />
    </div>
</template>

<script>
import CombinedTransferTables from "@/components/transfer_tables/CombinedTransferTables.vue";

export default {
    name: "UserTransferRequestsView",
    components: {
        CombinedTransferTables
    }
};
</script>
