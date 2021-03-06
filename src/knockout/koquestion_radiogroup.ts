﻿import * as ko from "knockout";
import {QuestionRadiogroupModel} from "../question_radiogroup";
import {JsonObject} from "../jsonobject";
import {QuestionFactory} from "../questionfactory";
import {QuestionCheckboxBaseImplementor} from "./koquestion_baseselect";

export class QuestionRadiogroup extends QuestionRadiogroupModel {
    constructor(public name: string) {
        super(name);
        new QuestionCheckboxBaseImplementor(this);
    }
    get itemClass() {
        return this.cssClasses.item + (this.colCount === 0 ? " sv_q_radiogroup_inline": "");
    }
}

JsonObject.metaData.overrideClassCreatore("radiogroup", function () { return new QuestionRadiogroup(""); });

QuestionFactory.Instance.registerQuestion("radiogroup", (name) => { var q = new QuestionRadiogroup(name); q.choices = QuestionFactory.DefaultChoices; return q; });
