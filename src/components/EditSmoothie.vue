<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit a smoothie {{ smoothie.title }} Smoothies</h2>
    <p v-if="error" class="red-text">{{ error }}</p>
    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Title</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>
      <div
        class="field"
        v-for="(ing, index) in smoothie.ingredients"
        :key="index"
      >
        <label for="ing">Ingredient</label>
        <input type="text" name="ing" v-model="smoothie.ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>

      <div class="field add-ingredient">
        <label for="add-ingredient">Edit Ingredient</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="updateIngredient"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init.js";
export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothieSlug: this.$route.params.smoothie_slug,
      smoothie: null,
      another: null,
      feedback: null,
      error: null,
    };
  },
  created() {
    let ref = db.collection("smoothies").where("slug", "==", this.smoothieSlug);

    ref
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.smoothie = doc.data();
          this.smoothie.id = doc.id;
        });
      })
      .catch((err) => console.log(err));
  },
  methods: {
    updateIngredient() {
      // another is each ingredient we are passing to the ingredients array
      if (this.another) {
        this.smoothie.ingredients.push(this.another.toLowerCase());
        this.another = "";
        console.log(this.smoothie.ingredients);
      } else {
        this.feedback = "You must enter a value to add an ingredient";
        setTimeout(() => {
          this.feedback = null;
        }, 2000);
      }
    },
    editSmoothie() {
      // console.log(this.smoothie);
      if (!this.smoothie.title || this.smoothie.ingredients.length === 0) {
        this.error = "Sorry, you have not made your smoothie yet.";
        setTimeout(() => {
          this.error = null;
        }, 1000);
      } else {
        console.log(this.smoothie.title, this.smoothie.ingredients);
        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.title
              .toLowerCase()
              .split(" ")
              .join("-"),
          })
          .then(() => {
            // return the page back to index page
            this.$router.push({ name: "Index" });
          })
          .catch((err) => console.log(err));
      }
      this.title = "";
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        (ingredient) => ingredient !== ing
      );
    },
  },
};
</script>

<style scoped>
.edit-smoothie {
  margin-top: 60px;
  max-width: 50vw;
  padding: 20px;
  position: relative;
}

.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-smoothie .field {
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
