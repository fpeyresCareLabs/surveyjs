<template>
    <div>
        <div v-if="hasHtml" v-html="customHtml"></div>
        <component v-if="hasDefaultRender" :is="componentName" :question="question" :css="css"/>
    </div>
</template>

<script lang="ts">
    import Vue,  {ComponentOptions} from 'vue'
    import {Component, Prop} from 'vue-property-decorator'
    import {SurveyModel} from '../survey'
    import {IElement, IQuestion} from '../base'
    import {Question as QuestionModel} from '../question'
    import {QuestionBase} from '../questionbase'
    import {QuestionCustomWidget} from '../questionCustomWidgets'
    import {helpers} from './helpers'

    @Component
    export default class CustomWidget extends Vue {
        @Prop
        css: any
        @Prop
        question: QuestionModel
        get hasDefaultRender(): boolean { return this.question.customWidget.isDefaultRender || this.hasVueComponent; }
        get hasHtml(): boolean { return this.question.customWidget.htmlTemplate ? true : false; }
        get customHtml(): string {return this.question.customWidget.htmlTemplate;}
        get hasVueComponent(): boolean { 
            var options = Vue["options"];
            if(!options) return false;
            return options.components && options.components[this.question.customWidget.name];
        }
        get componentName(): string {
            if(this.hasVueComponent) return this.question.customWidget.name;
            return "survey-" + this.question.getTemplate();
        }
        mounted() {
            this.question.customWidget.afterRender(this.question, this.$el);
        }
        updated() {
            //this.question.customWidget.afterRender(this.question, this.$el);
        }
        beforeDestroy() {
            this.question.customWidget.willUnmount(this.question, this.$el);
        }
    }
    Vue.component("survey-customwidget", CustomWidget)
</script>
