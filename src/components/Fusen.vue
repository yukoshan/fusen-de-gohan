<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card class="card-content">
      <v-card-title class="text-h5">{{ recipeTitle }}のレシピ</v-card-title>
      <v-card-text>
        <template v-for="(ingredient, index) in ingredients" :key="index" class="mb-4">
          <v-row>
            <v-col  cols="8">
              {{ ingredient.name }}
            </v-col>
            <v-col  cols="4">
              {{ ingredient.quantityAndUnit }}
            </v-col>
          </v-row>
        </template>

        <v-sheet height="200px"
      
      max-width="500px"
      class="bg-red-lighten-3 rounded-lg mt-3 pt-3 pl-3"
      elevation="3">
          {{ instructions }}
        </v-sheet>
      </v-card-text>

      <v-card-actions>
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
const /** ダイアログ開閉制御 */ dialog = ref(false);
const /** レシピタイトル */  recipeTitle = ref('');

const /** 材料 */ ingredients = ref([{ name: '', quantityAndUnit: '' }]);
const /** 作り方 */ instructions = ref('');


// --------------
// 関数定義
// --------------
const /** ダイアログ開く */ open = (recipi) => {
  const targetRecipi = JSON.parse(JSON.stringify(recipi));
  recipeTitle.value = targetRecipi.title;
  ingredients.value = targetRecipi.ingredients;
  instructions.value = targetRecipi.instructions;

  dialog.value = true
}

defineExpose({
  open,
  close
})

</script>

<style scoped>
  .card-content {
    font-family: 'Potta One', sans-serif;
    font-size: 24px;
  }
  
</style>
