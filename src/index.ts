import App from './main';
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import { initializeCustomElement, CustomElementComponentManager, setPropertyDidChange as setPropertyDidChangeWc } from '@glimmer/web-component';

const app = new App();
const containerElement = document.getElementById('app');

setPropertyDidChange(() => {
  app.scheduleRerender();
});

setPropertyDidChangeWc(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
    registry.register(`component-manager:/${app.rootName}/component-managers/custom-element`, CustomElementComponentManager);
  }
});

initializeCustomElement(app, 'cool-button', 'cool-button-wc', ['color']);
app.renderComponent('hello-wc', containerElement);
app.boot();
