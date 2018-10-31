export const renderComponentOnClient = ({component, saveContainer}) => {
    window.oc.renderNestedComponent($(component), () => {
        if (saveContainer) {
            saveContainer(component);
        }
    });
};