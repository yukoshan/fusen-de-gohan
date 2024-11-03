<template>
  <main class="main-content bg-yellow-lighten-4">
    <!-- タイトル -->
    <div class="header">
      <h1 class="main-title">付箋deごはん♪</h1>
      <img src="@\assets\images\food_hamburg.png" alt="ハンバーグ" class="header-image" />
      <img src="@\assets\images\food_omurice.png" alt="オムライス" class="header-image" />
      <img src="@\assets\images\food_kaisendon.png" alt="海鮮丼" class="header-image" />
    </div>
    <v-btn @click="openAddRecipeDialog" color="primary mt-2 mb-2">追加</v-btn>

    <!-- レシピ一覧のテーブル -->
    <v-data-table
      class="custom-table"
      :headers="headers"
      :items="recipiStore.recipiList"
      hide-default-footer
    >
      <template v-slot:item.view="{ item }">
        <v-btn class="view-btn" @click="openFusenDialog(item)">閲覧</v-btn>
      </template>
      <template v-slot:item.edit="{ item }">
        <v-btn class="edit-btn" @click="openEditRecipeDialog(item)">編集</v-btn>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-btn class="delete-btn" @click="deleteRecipi(item)">削除</v-btn>
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
  // モジュール定義
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
  const /** レシピを追加するダイアログを開く処理 */ openAddRecipeDialog = () => {
    recipeToEdit.value = { title: '', ingredients: [{ name: '', quantityAndUnit: '' }], instructions: '' };
    isEditing.value = false;
    recipiDialog.value.open();
  }

  const /** レシピを編集するダイアログを開く処理 */ openEditRecipeDialog = (recipe) => {
    recipeToEdit.value = recipe;
    isEditing.value = true;
    recipiDialog.value.open();
  }

  const /** レシピを保存（追加または更新）する処理 */ saveRecipe = (newRecipe) => {
    if (isEditing.value) {
      const index = recipiStore.recipiList.findIndex(r => r === recipeToEdit.value);
      if (index !== -1) {
        recipiStore.recipiList[index] = newRecipe;
      }
    } else {
      recipiStore.recipiList.push(newRecipe);
    }
  }

  const /** レシピを閲覧する処理 */ openFusenDialog = (item) => {
    const recipi = JSON.parse(JSON.stringify(item));
    fusenDialog.value.open(recipi);
  }

  const /** レシピを削除する処理 */ deleteRecipi = (item) => {
    if (confirm("削除してもよろしいですか？")){
      const index = recipiStore.recipiList.findIndex(r => r === item);
      if (index !== -1) {
        recipiStore.recipiList.splice(index, 1);
      }
    }
  }
</script>

<style scoped>
  body, html {
    height: 100%;
    margin: 0;
    background-color: #FFFDE7; /* 明るい薄めの黄色背景 */
    color: #333;
    font-family: 'Potta One', cursive; /* 可愛い和のフォント */
  }

  .main-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    min-width: 800px;
    min-height: 600px;
    padding: 20px;
    margin-top: 0;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px; /* 角を丸く調整 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'M PLUS Rounded 1c', cursive; /* 可愛い読みやすいフォント */
  }

  .main-title {
    font-family: 'Potta One', cursive; /* 可愛い和のフォント */
  }

  /* テーブルのスタイル */
  .custom-table >>> .v-data-table__th {
    background-color: #FBC02D;
    color: #333;
    font-weight: bold;
  }

  /* ボタンのスタイル */
  .v-btn {
    border-radius: 20px; /* ボタンの角を丸く調整 */
  }

  .view-btn {
    background-color: #ffe082;
    color: #000;
  }

  .view-btn:hover {
    background-color: #ffd54f;
  }

  .edit-btn {
    background-color: #81c784;
    color: #000;
  }

  .edit-btn:hover {
    background-color: #66bb6a;
  }

  .delete-btn {
    background-color: #ef5350;
    color: #fff;
  }

  .delete-btn:hover {
    background-color: #e53935;
  }

  /* ヘッダーのスタイル */
  .header {
    display: flex;
    align-items: center;
  }

  .header-image {
    width: 50px;
    height: auto;
    margin-left: 10px;
  }
</style>
