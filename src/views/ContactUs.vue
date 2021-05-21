<template>
  <div class="contactUs__container">
    <div class="contactUs__body">
      <h3>¿Nos buscas? Contactanos!</h3>
      <div>
        <p>
          Pen & Paper permite a las personas reunirse brindándoles un espacio orientado
          para desarrollar y resolver tareas de estudiantes de primaria o secundaria,
          colegios, investigar y desarrollar investigaciones de estudiantes de educación
          superior, universidades, y profesionales que
          necesiten tratar temas de su empresa.
        </p>
      </div>
      <h3>
        Scrum Team:
      </h3>
      <div>
        <p>Elguera Diestra, Andrés 20172099@aloe.ulima.edu.pe (Scrum Master)</p>
        <p>Cattaneo Carlos, Gerson Luis 20182435@aloe.ulima.edu.pe (Product Owner)</p>
        <p>Vásquez Torreblanca, Gonzalo José 20171641@aloe.ulima.edu.pe Development Team</p>
        <p>Porras Moreno, Leonardo Joaquín 20171210@aloe.ulima.edu.pe Development Team</p>
        <p>Sima Chavez, Carlo Fabrizzio 20153346@aloe.ulima.edu.pe Development Team</p>
        <p>Huaynalaya Ventrua, Juan Carlos 20172236@aloe.ulima.edu.pe  Development Team</p>
        <p>Ortega Apestegui, Luis Rodrigo 20172423@aloe.ulima.edu.pe Development Team</p>
        <p>Durand Vidal Alex, Nicolas 20132742@aloe.ulima.edu.pe Development Team</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ContactUs',
  components: {
  },
  props: {
  },
  computed: {
    ...mapState(['userProfile', 'rooms']),
  },
};
</script>

<style lang='scss' scoped>
.contactUs__container {
  background-color: var(--secondary-color);
  .contactUs__body {
    margin: 5%;

    & > h3 {
      margin-bottom: 1em;
    }

    & > div {
      margin-bottom: 2em;
    }
  }

}
</style>
