<template>
  <ValidationProvider
    class='input'
    :class="{ 'input--invalid': failedValidation }"
    tag="div"
    :name="name || label"
    :rules="rules"
    :vid="vid"
    v-slot="{ errors, required }"
  >
    <div class="input__info">
      <label v-if="label"  :for="id" class="label" :class="{ 'error': errors[0]}">
        <span>{{ label }}</span>
        <span> {{ required ? "*" : "" }} </span>
      </label>
      <span v-if="errors[0]" class='message' :class="{ 'error': errors[0]}">
        <slot name='error-message'>- {{ errors[0] }}</slot>
      </span>
    </div>

    <input
      :id="id"
      :value='value'
      :type='type'
      :disabled="disabled"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      class="input__input"
      :class="{
        'border': border,
        'borderReverse': borderReverse,
        'field--invalid': errors.length
      }"
    />
    <span class='icon'>
      <slot name='icon'></slot>
    </span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'CustomInput',

  components: { ValidationProvider },

  props: {
    label: String,
    id: String,
    value: String,
    placeholder: String,
    disabled: Boolean,
    type: String,
    vid: String,

    name: {
      type: String,
      default: '',
    },
    rules: {
      default: '',
      type: [String, Object],
    },
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
    required: {
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
  align-items: flex-end;
  justify-content: flex-end;
  color: inherit;
  text-align: start;
}

.input__info {
  display: flex;
  width: 100%;
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
  width: 100%;
}

.input__input.border {
  border: 1.2px solid var(--light-secondary-color);
  padding: var(--lengthSm3) var(--lengthMd1);
  background-color: var(--dark-color);
  border-radius: var(--radiusSm);
}

.input__input.borderReverse{
  border: 1.2px solid var(--secondary-color);
}

.input__input::placeholder {
  color: var(--gray);
}

.input--invalid .input__input {
  border-color: var(--danger);
}

.input__input.border:focus {
  border: solid 1.2px var(--primary-color);
}

.input:focus-visible, .input__input:focus-visible {
  outline: none;
}

.error, .error span {
  color: var(--danger);
}
.message {
  margin-bottom: var(--lengthSm2);
  text-align: start;
  font-size: .8em;
  align-self: flex-start;
  border-radius: var(--lengthSm1);
  font-weight: var(--regular);
}
.label {
  display: flex;
  align-self: flex-start;
  margin-bottom: var(--lengthSm2);
  font-size: 1em;
  font-weight: var(--semi-bold);

  & > * {
    margin-right: .5em;
  }
}

.input__input.field--invalid {
  border-color: var(--danger);
}
</style>
