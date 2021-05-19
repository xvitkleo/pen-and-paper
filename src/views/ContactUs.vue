<template>
  <div class="contactUs__container">
    <top-bar v-if="userProfile.name" tittle='Contactanos'
    :name='userProfile.name' :lastname="userProfile.isGoogle ? '' : userProfile.lastname">
    </top-bar>

    <div class="contactUs__body">
      <p>
        Pen&Paper permite a las personas reunirse brindándoles un espacio orientado
        para desarrollar y
        resolver tareas de estudiantes de primaria o secundaria, colegios, investigar y desarrollar
        investigaciones de estudiantes de educación superior, universidades, y profesionales que
        necesiten tratar temas de su empresa.
      </p>
      <h3>
        SCRUM TEAM:
      </h3>
      <p>Andrés Elguera Diestra 20172099@aloe.ulima.edu.pe (Scrum Master)</p>
      <p>Gerson Luis Cattaneo Carlos 20182435@aloe.ulima.edu.pe (Product Owner)</p>
      <p>Gonzalo José Vásquez Torreblanca 20171641@aloe.ulima.edu.pe Development Team</p>
      <p>Leonardo Joaquín Porras Moreno 20171210@aloe.ulima.edu.pe Development Team</p>
      <p>Gonzalo José Vásquez Torreblanca 20171641@aloe.ulima.edu.pe Development Team</p>
      <p>Leonardo Joaquín Porras Moreno 20171210@aloe.ulima.edu.pe Development Team</p>
      <p>Gonzalo José Vásquez Torreblanca 20171641@aloe.ulima.edu.pe Development Team</p>
      <p>Leonardo Joaquín Porras Moreno 20171210@aloe.ulima.edu.pe Development Team</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TopBar from '../components/TopBar.vue';

export default {
  name: 'ContactUs',
  components: {
    TopBar,
  },
  props: {
  },
  computed: {
    ...mapState(['userProfile', 'rooms']),
  },
};
</script>

<style lang='scss' scoped>
* {
  color: white;
}
.contactUs__container {
  background-color: var(--secondary-color);
  flex-grow: 1;

  .contactUs__body {
  }

}
</style>
