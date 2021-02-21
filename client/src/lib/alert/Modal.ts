import Vue from "vue";

function listenForModalClose(modalInstance: Vue): Promise<any>
{
  return new Promise((resolve) =>
  {
    // Listen for the modal removing it self from the DOM. This is to cover the case
    // where the modal does not emit an explicit close event
    const mutationObserver = new MutationObserver((mutationRecords: MutationRecord[]) =>
    {
      mutationRecords.forEach((mutationRecord) =>
      {
        mutationRecord.removedNodes.forEach((removedNode: Node) =>
        {
          if (removedNode === modalInstance.$el)
          {
            mutationObserver.disconnect();
            modalInstance.$destroy();
            resolve(null);
          }
        });
      });
    });
    mutationObserver.observe(document.getElementById("app"), {childList: true});

    // handle explicit close event from the modal.
    modalInstance.$on("close", (value: any) =>
    {
      mutationObserver.disconnect();
      modalInstance.$destroy();
      modalInstance.$el.remove();
      resolve(value);
    });
  });
}

/**
 * open a modal dialog
 * @param componentClass - the vue component that comprises the modal.
 */
export function openModal(componentClass: any): Promise<any>
{
  const VueClassConstructor = Vue.extend(componentClass);
  const instance = new VueClassConstructor();
  instance.$mount();
  document.getElementById("app").appendChild(instance.$el);

  return listenForModalClose(instance);
}
