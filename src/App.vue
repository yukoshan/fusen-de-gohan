<template>
  <main class="main-content">
    <h1 class="main-title">付箋deごはん♪</h1>
    <v-btn @click="openAddRecipeDialog">追加</v-btn>

    <v-data-table
      class="wider-table"
      :headers="headers"
      :items="recipiStore.recipiList"
      hide-default-footer
    >
      <template v-slot:item.view="{ item }">
        <v-btn @click="openFusenDialog(item)">閲覧</v-btn>
      </template>
      <template v-slot:item.edit="{ item }">
        <v-btn @click="openEditRecipeDialog(item)">編集</v-btn>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-btn @click="deleteRecipi(item)">削除</v-btn>
      </template>
    </v-data-table>

    <!-- レシピ作成・編集ダイアログコンポーネント -->
    <Recipe
      ref="recipiDialog"
      :recipeToEdit="recipeToEdit"
      :isEditing="isEditing"
      @submit-recipe="saveRecipe"
    />

    <!-- レシピ閲覧ダイアログコンポーネント -->
    <Fusen
      ref="fusenDialog"
    />
  </main>
</template>

<script setup>
// --------------
// import定義
// --------------
import { ref } from 'vue'
import { useRecipiStore } from '@/stores/recipiStore.js'
import Recipe from '@/components/Recipe.vue'
import Fusen from '@/components/Fusen.vue'


// --------------
// 変数定義
// --------------
const recipiStore = useRecipiStore();
const recipiDialog = ref(null);
const fusenDialog = ref(null);
const /** 編集するレシピデータ */ recipeToEdit = ref(null);
const /** 編集モードか判定 */ isEditing = ref(false);

// --------------
// 一覧定義
// --------------
const headers = [
  { title: 'タイトル', key: 'title', width: '55%' },
  { title: '閲覧', key: 'view', width: '15%' },
  { title: '編集', key: 'edit', width: '15%' },
  { title: '削除', key: 'delete', width: '15%' }
];

// --------------
// イベント定義
// --------------

// レシピを追加するダイアログを開く処理
const openAddRecipeDialog = () => {
  recipeToEdit.value = { title: '', ingredients: [{ name: '', quantityAndUnit: '' }], instructions: '' };
  isEditing.value = false;
  recipiDialog.value.open();
}

// レシピを編集するダイアログを開く処理
const openEditRecipeDialog = (recipe) => {
  recipeToEdit.value = recipe;
  isEditing.value = true;
  recipiDialog.value.open();
}

// レシピを保存（追加または更新）する処理
const saveRecipe = (newRecipe) => {
  if (isEditing.value) {
    const index = recipiStore.recipiList.findIndex(r => r === recipeToEdit.value);
    if (index !== -1) {
      recipiStore.recipiList[index] = newRecipe;
    }
  } else {
    recipiStore.recipiList.push(newRecipe);
  }
}

// レシピを閲覧する処理
const openFusenDialog = (item) => {
  const recipi = JSON.parse(JSON.stringify(item));
  fusenDialog.value.open(recipi);
}

// レシピを削除する処理
const deleteRecipi = (item) => {
  if (confirm("削除してもよろしいですか？")){
    const index = recipiStore.recipiList.findIndex(r => r === item);
    if (index !== -1) {
      recipiStore.recipiList.splice(index, 1);
    }
  }
}


</script>

<style scoped>
/*
  body, html {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center; 
    padding-top: 0; 
  }

  .main-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 1200px;
    padding: 20px;
    margin-top: 0; 
  }

  .wider-table {
    width: 800px;
    max-width: 100%;
  }
*/

  

  body, html {
    height: 100%;
    margin: 0;
    background-color: #fff9c4; /* 明るい黄色背景 */
    color: #333; /* テキストの色 */
    font-family: 'Potta One', cursive; /* 可愛いフォント */
  }

  .main-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 1200px;
    padding: 20px;
    margin-top: 0;
    background-color: rgba(255, 255, 255, 0.8); /* 白の背景でふんわり */
    border-radius: 10px; /* 角を丸く */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 優しい影 */
    font-family: 'M PLUS Rounded 1c', cursive; /* 可愛いフォント */
  }

  .main-title {
    font-family: 'Potta One', cursive; /* 可愛いフォント */
  }

  .wider-table {
    width: 800px;
    max-width: 100%;
    background-color: #ffecb3; /* テーブルの背景色 */
    border-radius: 8px; /* テーブルの角を丸く */
  }

  /* ボタンのスタイル */
  .v-btn {
    background-color: #ffe082; /* ボタンの背景色 */
    color: #000; /* ボタンのテキスト色 */
    border-radius: 20px; /* ボタンの角を丸く */
  }

  .v-btn:hover {
    background-color: #ffd54f; /* ホバー時の色 */
  }
</style>
