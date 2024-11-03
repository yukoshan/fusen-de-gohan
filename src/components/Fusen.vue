<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card class="card-content pl-6 pr-4 pb-4">
      <v-card-title class="card-title">{{ recipeTitle }}のレシピ</v-card-title>
      <v-card-text >
        <template v-for="(ingredient, index) in ingredients" :key="index" class="mb-4">
          <v-row>
            <v-col cols="8">
              {{ ingredient.name }}
            </v-col>
            <v-col  cols="4">
              {{ ingredient.quantityAndUnit }}
            </v-col>
          </v-row>
        </template>

        <v-sheet
          height="200px"
          max-width="400px"
          class="transparent-sheet rounded-lg mt-4 pt-3 pl-3"
          elevation="3"
        >
          <span>一口メモ</span><br />
          {{ instructions }}
        </v-sheet>
      </v-card-text>

      <v-card-actions>
        <!-- ダイアログ閉じるボタン -->
        <v-btn color="primary" @click="dialog=false">閉じる</v-btn>
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
// イベント定義
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
    background-image: url('@/assets/images/postit_paleyellow.png');
    background-size: cover;
    background-position: center;
    color: #333;
  }

  .card-title {
    font-family: 'Potta One', sans-serif;
    font-size: 30px;
  }

  .transparent-sheet {
    background-color: rgba(255, 255, 255, 0.5);
  }


</style>
