<template>

    <div id="app">

        <Header></Header>

        <Main></Main>

        <Footer></Footer>

    </div>

</template>

<script>

    import Footer from './components/Footer.vue';
    import Header from './components/Header.vue';
    import Main from './components/Main.vue';

    export default {
        name: 'app',
        components: {
            Header, Main, Footer
        }
    }

</script>
