<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content" @click="removeSmoothie(smoothie.id)">
        <i class="material-icons delete">delete</i>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, id) in smoothie.ingredients" :key="id">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link
          :to="{
            name: 'EditSmoothie',
            params: { smoothie_slug: smoothie.slug },
          }"
        >
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  methods: {
    removeSmoothie(id) {
      // find the doc from firestore with corresponding id
      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(
            (smoothie) => smoothie.id !== id
          );
        })
        .catch((err) => {
          console.log("Document does not exist", err);
        });
    },
  },
  data() {
    // const date = new Date();
    return {
      smoothies: [
        // {
        //   title: "Coca Brew",
        //   slug: "coca-brew",
        //   ingredients: ["cocoa", "banana", "milk"],
        //   id: 1
        // },
      ],
    };
  },
  created() {
    // at this point,
    // fetch data from firestore
    db.collection("smoothies")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        });
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 60px;
}

.index h2 {
  font-size: 1.2em;
  text-align: center;
  margin-top: 0;
}

.ingredients {
  margin: 30px auto;
}

.ingredients li {
  display: inline-block;
}

.index .delete {
  position: absolute;
  top: 4px;
  right: 10px;
  cursor: pointer;
  color: #aaa;
}
</style>
