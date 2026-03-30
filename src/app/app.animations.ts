import {
    trigger,
    transition,
    style,
    query,
    group,
    animate
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
    transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: 0,
                zIndex: 2
            })
        ], { optional: true }),
        query(':enter', [
            style({ 
                opacity: 0, 
                transform: 'scale(0.9) translateY(40px) perspective(1000px) rotateX(10deg)',
                filter: 'blur(10px)'
            })
        ], { optional: true }),
        group([
            query(':leave', [
                animate('600ms cubic-bezier(0.16, 1, 0.3, 1)', style({ 
                    opacity: 0, 
                    transform: 'scale(1.1) translateY(-40px) perspective(1000px) rotateX(-10deg)',
                    filter: 'blur(15px)'
                }))
            ], { optional: true }),
            query(':enter', [
                animate('800ms 200ms cubic-bezier(0.16, 1, 0.3, 1)', style({ 
                    opacity: 1, 
                    transform: 'scale(1) translateY(0) rotateX(0deg)',
                    filter: 'blur(0)'
                }))
            ], { optional: true })
        ])
    ])
]);

