export const renderComponentOnClient = ({component, saveContainer}) => {
    const oc = (window as any).oc;
    oc.renderNestedComponent($(component), () => {
        if (saveContainer) {
            saveContainer(component);
        }
    });
};