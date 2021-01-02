<template>
  <div class="add-smoothie container">
    <h2 class="center-aligned indigo-text">Add New Smoothie Recipe</h2>
    <p v-if="error" class="red-text">{{ error }}</p>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Title</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div class="field" v-for="(ing, index) in ingredients" :key="index">
        <label for="ing">Ingredient</label>
        <input type="text" name="ing" v-model="ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>

      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredient</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIngredient"
          v-model="another"
        />
        <!-- key modifier on the keydown event on tab because tab moves to the next element, which we do not want -->
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
// grab our databse
import db from "@/firebase/init";
export default {
  name: "AddSmoothie",
  data() {
    return {
      title: "",
      another: "",
      ingredients: [],
      feedback: null,
      error: null,
    };
  },
  methods: {
    addSmoothie() {
      if (!this.title || this.ingredients.length === 0) {
        this.error = "Sorry, you have not made your smoothie yet.";
        setTimeout(() => {
          this.error = null;
        }, 1000);
      } else {
        console.log(this.title, this.ingredients);
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.title
              .toLowerCase()
              .split(" ")
              .join("-"),
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch((err) => console.log(err));
      }
      this.title = "";
    },
    addIngredient() {
      if (this.another) {
        this.ingredients.push(this.another.toLowerCase());
        this.another = "";
        console.log(this.ingredients);
      } else {
        this.feedback = "You must enter a value to add an ingredient";
        setTimeout(() => {
          this.feedback = null;
        }, 2000);
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(
        (ingredient) => ingredient !== ing
      );
    },
  },
};
</script>

<style scoped>
.add-smoothie {
  margin-top: 60px;
  max-width: 50vw;
  padding: 20px;
  position: relative;
}

.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-smoothie .field {
  margin: 20px auto;
}

.field {
  position: relative;
}

.field .delete {
  cursor: pointer;
  position: absolute;
  right: 10px;
  bottom: 16px;
  font-size: 1.4em;
  color: #aaa;
}
</style>
