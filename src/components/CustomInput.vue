<template>
  <div class='input' :class="{ 'input--invalid': failedValidation }">
    <label :for="id" v-if="label" class="label">{{ label }}</label>

    <input
      :id="id"
      :value='value ? value : initialValue'
      :type='type'
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
      class="input__input"
      :class="{'border': border, 'disabled': disabled, 'borderReverse': borderReverse}"
    />
    <span class='icon'>
      <slot name='icon'></slot>
    </span>
    <span class='error-message'>
      <slot name='error-message'></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    label: String,
    id: String,
    value: String,
    placeholder: String,
    initialValue: String,
    type: String,
    border: {
      type: Boolean,
      required: false,
      default: true,
    },
    borderReverse: {
      type: Boolean,
      required: false,
      default: false,
    },
    failedValidation: Boolean,
    disabled: {
      default: false,
    },
  },
};
</script>

<style lang='scss' scoped>
* {
  font-size: var(--lengthBase);
}
.input {
  position: relative;
  display: flex;
  flex-direction: column;
  color: inherit;
  text-align: start;
}

.input__label {
  font-family: var(--poppins);
  font-size: var(--lengthSm3);
  font-weight: var(--semi-bold);
  text-transform: uppercase;
}

.input--invalid .input__label {
  color: var(--danger);
}

.input__input {
  color: white;
  background-color: transparent;
  padding: 0;
  border: none;
  border-radius: 0;
  transition: box-shadow 150ms;
  height: 100%;
  width: 100%;
}

.input__input.border {
  border: 2px solid var(--black-color);
  padding: var(--lengthSm3) var(--lengthMd1);
  background-color: var(--dark-color);
  border-radius: var(--radiusBase);
}

.input__input.borderReverse{
  border: 2px solid var(--secondary-color);
}

.input__input::placeholder {
  color: var(--gray);
}

.input--invalid .input__input {
  border-color: var(--danger);
}

.input__input.border:focus {
  border: solid 2px var(--primary-color);
}

.input:focus-visible, .input__input:focus-visible {
  outline: none;
}

.error-message {
  position: absolute;
  top: 105%;
  left: 0;
  right: 0;
  color: var(--danger);
  font-size: var(--lengthSm3);
  border-radius: var(--lengthSm1);
}

.label {
  margin-bottom: var(--lengthSm2);
  color: var(--gray2);
  font-size: 1em;
  font-weight: var(--semi-bold);
}

.disabled {
  color: var(--gray);
}
</style>
