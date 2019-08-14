<template>
    <div class="dept">
        <table id="dept_table" class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="dept.id" v-for="dept in deptList">
                    <td>{{dept.id}}</td>
                    <td>{{dept.name}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
    .dept {
        width: 80%;
        margin: 0 auto;
    }
</style>

<script>
    export default {
        name: "Dept",
        data() {
            return {
                deptList: []
            }
        },
        created() {
            //this.deptList.push({id: 1, name: "dept1"}, {id: 2, name: "dept2"});
            this.getDeptList();
        },
        watch: {},
        methods: {
            getDeptList() {
                this.$http.get("/dept/get?id=6abad1b324fd438a9cfe1099ab4c78d7").then(res => {
                    this.deptList = [res.data];
                });
            }
        },
        computed: {},
        mounted() {
        },
        components: {}
    };
</script>
