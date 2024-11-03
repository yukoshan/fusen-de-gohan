<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card class="bg-yellow-lighten-4">
      <v-card-title class="text-h5 header">
        {{ isEditing ? 'レシピ編集' : 'レシピ作成' }}
        <img src="@\assets\images\cooking_sauce.png" alt="ソース" class="header-image" />
        <img src="@\assets\images\cooking_umami_choumiryou.png" alt="うまみ" class="header-image" />
      </v-card-title>
      <v-card-text class="pb-2">
        <v-form class="form-content">
          <!-- レシピタイトル -->
          <v-text-field
            v-model="recipeTitle"
            label="レシピタイトル"
            outlined
            class="pb-3"
            hide-details
          ></v-text-field>

          <!-- 材料入力フィールド -->
          <div v-for="(ingredient, index) in ingredients" :key="index" class="mb-4">
            <v-row>
              <v-col cols="6" class="pb-0">
                <v-text-field
                  v-model="ingredient.name"
                  label="材料名"
                  outlined
                  hide-details
                  class="pb-0"
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="pb-0">
                <v-text-field
                  v-model="ingredient.quantityAndUnit"
                  label="量と単位 (例: '大さじ１' や '2個')"
                  outlined
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <!-- 材料追加ボタン -->
          <v-btn color="primary" @click="addIngredient" class="mt-2">材料追加</v-btn>

          <!-- 作り方入力フィールド -->
          <v-textarea
            v-model="instructions"
            label="一口メモ"
            rows="5"
            outlined
            class="mt-5"
            hide-details
          ></v-textarea>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <!-- 登録ボタン -->
        <v-btn class="submit-btn" @click="submitRecipe">{{ isEditing ? '更新' : '登録' }}</v-btn>
        <!-- ダイアログ閉じるボタン -->
        <v-btn class="close-btn ml-6" @click="dialog=false">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  // --------------
  // モジュール定義
  // --------------
  import { ref, watch } from 'vue'

  // --------------
  // 変数定義
  // --------------
  const props = defineProps({
    recipeToEdit: Object,  // 編集するレシピデータ
    isEditing: Boolean     // 編集モードかどうか
  })

  const /** ダイアログ開閉制御 */ dialog = ref(false);
  const /** レシピタイトル */  recipeTitle = ref('');
  const /** 材料 */ ingredients = ref([{ name: '', quantityAndUnit: '' }]);
  const /** 作り方 */ instructions = ref('');

  // --------------
  // イベント定義
  // --------------
  const /** ダイアログ開く */ open = () => {
    dialog.value = true
  }

  const /** 材料の追加 */ addIngredient = () => {
    ingredients.value.push({ name: '', quantityAndUnit: '' });
  }

  const emit = defineEmits(['submit-recipe']);
  const  /** レシピを親に送信 */submitRecipe = () => {
    const recipeData = {
      title: recipeTitle.value,
      ingredients: ingredients.value,
      instructions: instructions.value
    };

    // 'add-recipe'イベントを発火して、親にレシピを送信
    emit('submit-recipe', recipeData);
    
    // ダイアログを閉じる
    dialog.value = false;
  }

  // レシピデータが変更された場合にフォームに反映
  watch(() => props.recipeToEdit, (newRecipe) => {
    if (newRecipe) {
      recipeTitle.value = newRecipe.title;
      ingredients.value = [...newRecipe.ingredients];
      instructions.value = newRecipe.instructions || '';
    }
  }, { immediate: true });

  defineExpose({
    open,
    close
  })
</script>

<style scoped>
  .form-content {
    font-family: 'M PLUS Rounded 1c', cursive; /* 可愛い和のフォント */
    background-color: #FFFDE7;
    padding: 12px;
  }

  /* ボタンのスタイル */
  .v-btn {
    border-radius: 20px; /* ボタンの角を丸く調整 */
  }

  .submit-btn {
    background-color: #81c784;
    color: #000;
  }

  .submit-btn:hover {
    background-color: #66bb6a;
  }

  .close-btn {
    background-color: #ef5350;
    color: #fff;
  }

  .close-btn:hover {
    background-color: #e53935;
  }

  /* ヘッダーのスタイル */
  .header {
    display: flex;
    align-items: center;
    font-family: 'Potta One', cursive; /* 和の可愛いフォント */
  }

  .header-image {
    width: 50px;
    height: auto;
    margin-left: 10px;
  }

</style>
