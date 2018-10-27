export const loadComponentOnClient = ({component, saveContainer}) => {
    window.oc.renderNestedComponent($(component), () => {
        if (saveContainer) {
            saveContainer(component);
        }
    });
};