<template>
    <footer>
        <hr>
        <h4>TODO:</h4>

        <ol>
            <li style="text-decoration: line-through">Fix pausing</li>
            <li style="text-decoration: line-through">Show apple after start</li>
            <li style="text-decoration: line-through">Correct current scores by vue interface</li>
            <li>Correct scores logging by vue interface</li>
        </ol>

        <h4>Future (proposed)</h4>
        <ol>
            <li>Add bad apples</li>
            <li>Add network gaming</li>
            <li>Add tests</li>
            <li>Add CI</li>
            <li>Use sass instead of css</li>
            <li>Add user account</li>
            <li>Fix bug connected with appearing simultaneously many apples</li>
            <li>Special color of head</li>
            <li>Fix bug connected with changes direction many time in one round that allow bump int snake with length 3</li>
            <li>Add login by google</li>
            <li>Make it mobile friendly</li>
        </ol>
        <h4>Change Log</h4>
        <h5>v0.3</h5>
        <ol>
            <li style="text-decoration: line-through">Add webpack</li>
            <li style="text-decoration: line-through">Create snake as module</li>
            <li style="text-decoration: line-through">Add two players</li>
        </ol>
        <h5>v0.2</h5>
        <ol>
            <li style="text-decoration: line-through">Add apples</li>
            <li style="text-decoration: line-through">Add boundaries</li>
            <li style="text-decoration: line-through">Add scores</li>
        </ol>
        <h5>v0.1</h5>
        <ol>
            <li style="text-decoration: line-through">Add map</li>
            <li style="text-decoration: line-through">Add snake</li>
            <li style="text-decoration: line-through">Add events</li>
        </ol>
    </footer>
</template>

<script>
    export default {
        name: 'Footer'
    }
</script>