<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title class="text-h5">{{ isEditing ? 'レシピ編集' : 'レシピ作成' }}</v-card-title>
      <v-card-text>
        <v-form>
          <!-- レシピタイトル -->
          <v-text-field
            v-model="recipeTitle"
            label="レシピタイトル"
            outlined
          ></v-text-field>

          <!-- 材料入力フィールド -->
          <div v-for="(ingredient, index) in ingredients" :key="index" class="mb-4">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="ingredient.name"
                  label="材料名"
                  outlined
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="ingredient.quantityAndUnit"
                  label="量と単位 (例: '100g' や '2個')"
                  outlined
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <!-- 材料追加ボタン -->
          <v-btn color="primary" @click="addIngredient">材料追加</v-btn>

          <!-- 作り方入力フィールド -->
          <v-textarea
            v-model="instructions"
            label="作り方"
            rows="5"
            outlined
          ></v-textarea>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <!-- 登録ボタン -->
        <v-btn color="secondary" @click="submitRecipe">{{ isEditing ? '更新' : '登録' }}</v-btn>
        <!-- ダイアログ閉じるボタン -->
        <v-btn color="secondary" @click="dialog=false">閉じる</v-btn>
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
// 関数定義
// --------------
// onMounted(() => {
//   dialog.value = true
// })

const /** ダイアログ開く */ open = () => {
  dialog.value = true
}

const addIngredient /** 材料の追加 */ = () => {
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
  
</style>
