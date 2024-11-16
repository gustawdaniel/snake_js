import mitt from 'mitt';

type Events = {
    reset_map: undefined;
    bar?: number;
};

export const emitter = mitt<Events>(); // inferred as Emitter<Events>