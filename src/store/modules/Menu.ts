import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class Menu extends VuexModule {
  isCollapse = false;
  @Mutation
  setCollapse() {
    this.isCollapse = !this.isCollapse;
  }
  @Action
  changeCollapse() {
    this.context.commit("setCollapse");
  }
}
