<template>
  <div class="lg:w-2/5 w-full">
    <div class="text-center space-y-2 mb-8">
      <p class="text-2xl font-semibold">BrandMobile Africa</p>
      <p class="text-xl font-semibold">Q & A App</p>
      <p>
        Select your country, input your phone number and click the start button to begin
        the test.
      </p>
    </div>
    <vs-select
      filter
      block
      placeholder="Select"
      type="text"
      v-model="form.country"
      class="mb-5"
    >
      <vs-option
        v-for="country in countries"
        :key="country.index"
        :label="country"
        :value="country"
      >
        {{ country }}
      </vs-option>
    </vs-select>
    <vs-input block v-model="form.phoneNo" type="number" placeholder="Phone Number">
      <template #icon>
        <i class="fal fa-phone"></i>
      </template>
    </vs-input>

    <button
      @click="start"
      :disabled="form.country !== '' && form.phoneNo !== '' ? false : true"
      class="bg-green-600 text-white font-semibold text-xl shadow-md hover:bg-green-500 py-2 px-10 rounded-md mt-8"
    >
      Start
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { country: "", phoneNo: "" },
      countries: [
        "Algeria",
        "Angola",
        "Benin",
        "Botswana",
        "Burkina Faso",
        "Burundi",
        "Cameroon",
        "Cape Verde",
        "Central African Republic",
        "Chad",
        "Comoros",
        "Congo-Brazzaville",
        "Democratic Republic of the Congo",
        "Côte d'Ivoire",
        "Djibouti",
        "Egypt",
        "Equatorial Guinea",
        "Eritrea",
        "Ethiopia",
        "Gabon",
        "The Gambia",
        "Ghana",
        "Guinea",
        "Guinea-Bissau",
        "Kenya",
        "Lesotho",
        "Liberia",
        "Libya",
        "Madagascar",
        "Malawi",
        "Mali",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Niger",
        "Nigeria",
        "Rwanda",
        "Senegal",
        "Seychelles",
        "Sierra Leone",
        "Somalia",
        "South Africa",
        "Sudan",
        "Swaziland",
        "Tanzania",
        "Togo",
        "Tunisia",
      ],
    };
  },
  methods: {
    start() {
      this.$store.commit("setCandidateDetails", this.form);
      this.$router.push({ name: "Question" });
    },
  },
};
</script>

<style></style>
