declare namespace __VelocityReact {
    interface VelocityComponentProps {
        animation?: any;
        runOnMount?: boolean;
        targetQuerySelector?: string;
        duration?: number;
        delay?: number;
        loop?: number;
        easing?: string | number[];
    }

    type VelocityComponent = React.ComponentClass<VelocityComponentProps>;
    var VelocityComponent: VelocityComponent;

    interface VelocityTransitionGroupProps {
        component?: React.ReactType;
        childFactory?: (child: React.ReactElement<any>) => React.ReactElement<any>;
        enter?: any;
        leave?: any;
        runOnMount?: boolean;
    }

    type VelocityTransitionGroup = React.ComponentClass<VelocityTransitionGroupProps>;
    var VelocityTransitionGroup: VelocityTransitionGroup;

    interface velocityHelpers {
        registerEffect: (suffix: any, animation: any) => string
    }

    type VelocityHelpers = velocityHelpers;
    var velocityHelpers: VelocityHelpers;
}

declare module "velocity-react" {
    export = __VelocityReact;
}