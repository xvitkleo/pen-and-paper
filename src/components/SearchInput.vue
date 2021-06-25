<template>
  <div class='input'>
    <div>
      <input
        :id="id"
        type="search"
        @input="$emit('input', $event.target.value)"
        class="input__input"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    id: String,
    value: String,
  },
};
</script>

<style lang='scss' scoped>
input {
  outline: none;
}

.input * {
  font-size: var(--lengthSm3);
}

input[type=search] {
  width: 15px;
  color: transparent;
  cursor: pointer;
  box-sizing: content-box;
  font-size: 100%;
  border: none;
  border: 2px solid transparent;
  background: transparent url(../assets/search.svg) no-repeat 9px center;
  padding: 5px 10px;
  -webkit-border-radius: 10em;
  -moz-border-radius: 10em;
  border-radius: 10em;
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  transition: all .5s;
}
input[type=search]:focus {
  width: 130px;
  padding-left: 3.1em;
  border: 2px solid var(--light-gray);
  cursor: auto;
  color: var(--white-color);
}

</style>
