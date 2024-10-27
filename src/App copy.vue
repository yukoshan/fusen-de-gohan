<template>
  <main>
    <h1>付箋deごはん♪</h1>
    <v-btn @click="recipiDialog.open()">追加</v-btn>
    <v-data-table
      :headers="headers"
      :items="recipiStore.recipiList"
      hide-default-footer
    >
    
      <template v-slot:item.delete="{ item }">
        <v-btn @click="viewItem(item.raw)">閲覧</v-btn>
      </template>
      <template v-slot:item.view="{ item }">
        <v-btn @click="editItem(item.raw)">編集</v-btn>
      </template>
      <template v-slot:item.edit="{ item }">
        <v-btn @click="deleteItem(item.raw)">削除</v-btn>
      </template>
    </v-data-table>
  </main>

   <!-- レシピ作成ダイアログコンポーネント -->
  <Recipe ref="recipiDialog" @add-recipe="addRecipeToList" />
</template>

<script setup>
// --------------
// import
// --------------
import { ref } from 'vue'
import { useRecipiStore } from '@/stores/recipiStore.js'
const recipiStore = useRecipiStore();
import Recipe from '@/components/Recipe.vue'


// --------------
// 変数定義
// --------------
const recipiDialog = ref(null);

// --------------
// 一覧定義
// --------------
const headers = [
  { title: 'タイトル', key: 'title' },
  { title: '閲覧', key: 'view' },
  { title: '編集', key: 'edit' },
  { title: '削除', key: 'delete' }
]

// --------------
// イベント定義
// --------------

// 子コンポーネントからレシピを受け取ってリストに追加する
const addRecipeToList = (newRecipe) => {
  recipiStore.recipiList.push(newRecipe);
}
</script>

<style scoped></style>
