<template>
  <div>
    <div class="row">
      <div class="col mr-5">
        <form>
          <div class="form-group row">
            <div class="col-sm-2 col-form-label" />
            <div class="col-sm-10">
              <h2 class="font-weight-bold">
                {{ $t(`contact.title`) }}
              </h2>
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              {{ $t(`contact.form.to`) }}
            </label>
            <div class="col-sm-10">
              <input type="text" class="form-control full-width">
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              {{ $t(`contact.form.name`) }}
            </label>
            <div class="col-sm-10">
              <input type="text" class="form-control full-width">
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              {{ $t(`contact.form.company`) }}
            </label>
            <div class="col-sm-10">
              <input type="text" class="form-control full-width">
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              {{ $t(`contact.form.tel`) }}
            </label>
            <div class="col-sm-10">
              <input type="text" class="form-control full-width">
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              {{ $t(`contact.form.email`) }}
            </label>
            <div class="col-sm-10">
              <input type="text" class="form-control full-width">
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              {{ $t(`contact.form.subject`) }}
            </label>
            <div class="col-sm-10">
              <input type="text" class="form-control full-width">
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              {{ $t(`contact.form.details`) }}
            </label>
            <div class="col-sm-10">
              <textarea class="form-control full-width" rows="10" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-2 col-form-label" />
            <div class="col-sm-10">
              <button type="submit" class="custom pink lg">
                {{ $t(`contact.form.send`) }}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="col">
        <h3 class="mb-2 font-weight-bold">
          {{ $t(`contact.addr.title`)}}
        </h3>
        <h4 class="mb-4">
          {{ $t(`contact.addr.addr`) }}
        </h4>
        <h4>
          <i class="fas fa-phone mr-3"></i>
          {{ $t(`contact.addr.tel`) }}
        </h4>
        <h4>
          <i class="fas fa-fax mr-3"></i>
          {{ $t(`contact.addr.fax`) }}
        </h4>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.field-label.is-normal {
  max-width: 80px;
  label {
    font-size: 1.1rem;
  }
}
input, textarea {
  max-width: 500px;
  width: 100%;
}
textarea {
  resize: vertical;
  min-height: 35px;
}
button {
  width: 20%;
  min-width: 80px;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'contact-us',
  components: { },
  computed: {
    ...mapGetters([
      'lang'
    ])
  },
  data: () => {
    return {
    }
  },
}
</script>
