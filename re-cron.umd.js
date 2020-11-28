(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@sbzen/cron-core')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', '@sbzen/cron-core'], factory) :
    (global = global || self, factory(global.ReCron = {}, global.React, global.cronCore));
}(this, (function (exports, React, cronCore) { 'use strict';

    React = React && React.hasOwnProperty('default') ? React['default'] : React;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var QuartzCronService =
    /** @class */
    function () {
      function QuartzCronService(coreService) {
        this.coreService = coreService;
        this.view = {
          seconds: {
            selected: cronCore.Mode.AND,
            values: {
              AND: this.createValue(['0'], cronCore.Mode.AND),
              RANGE: this.createValue(['0', '0'], cronCore.Mode.RANGE),
              INCREMENT: this.createValue(['0', '1'], cronCore.Mode.INCREMENT),
              EVERY: this.createValue(['*'], cronCore.Mode.EVERY)
            }
          },
          minutes: {
            selected: cronCore.Mode.AND,
            values: {
              AND: this.createValue(['0'], cronCore.Mode.AND),
              RANGE: this.createValue(['0', '0'], cronCore.Mode.RANGE),
              INCREMENT: this.createValue(['0', '1'], cronCore.Mode.INCREMENT),
              EVERY: this.createValue(['*'], cronCore.Mode.EVERY)
            }
          },
          hours: {
            selected: cronCore.Mode.AND,
            values: {
              RANGE: this.createValue(['0', '0'], cronCore.Mode.RANGE),
              INCREMENT: this.createValue(['0', '1'], cronCore.Mode.INCREMENT),
              AND: this.createValue(['0'], cronCore.Mode.AND),
              EVERY: this.createValue(['*'], cronCore.Mode.EVERY)
            }
          },
          month: {
            selected: cronCore.Mode.EVERY,
            values: {
              AND: this.createValue([cronCore.MonthCode.JAN], cronCore.Mode.AND),
              RANGE: this.createValue(['1', '1'], cronCore.Mode.RANGE),
              INCREMENT: this.createValue(['1', '1'], cronCore.Mode.INCREMENT),
              EVERY: this.createValue(['*'], cronCore.Mode.EVERY),
              NONE: this.createValue(['*'], cronCore.Mode.NONE)
            }
          },
          dayOfMonth: {
            selected: cronCore.Mode.NONE,
            values: {
              AND: this.createValue(['1'], cronCore.Mode.AND),
              LAST_DAY: this.createValue(['L'], cronCore.Mode.LAST_DAY),
              NEAREST_WEEKDAY_OF_MONTH: this.createValue(['1W'], cronCore.Mode.NEAREST_WEEKDAY_OF_MONTH),
              DAYS_BEFORE_END_MONTH: this.createValue(['L-1'], cronCore.Mode.DAYS_BEFORE_END_MONTH),
              LAST_DAY_WEEK: this.createValue(['LW'], cronCore.Mode.LAST_DAY_WEEK),
              RANGE: this.createValue(['0', '0'], cronCore.Mode.RANGE),
              INCREMENT: this.createValue(['1', '1'], cronCore.Mode.INCREMENT),
              EVERY: this.createValue(['*'], cronCore.Mode.EVERY),
              NONE: this.createValue([''], cronCore.Mode.NONE)
            }
          },
          dayOfWeek: {
            selected: cronCore.Mode.NONE,
            values: {
              AND: this.createValue(['SUN'], cronCore.Mode.AND),
              INCREMENT: this.createValue(['1', '1'], cronCore.Mode.INCREMENT),
              NTH_WEEKDAY_OF_MONTH: this.createValue(['1', '1'], cronCore.Mode.NTH_WEEKDAY_OF_MONTH),
              LAST_NTH_DAY_WEEK: this.createValue(['1L'], cronCore.Mode.LAST_NTH_DAY_WEEK),
              NONE: this.createValue([''], cronCore.Mode.NONE),
              EVERY: this.createValue(['*'], cronCore.Mode.EVERY)
            }
          },
          year: {
            selected: cronCore.Mode.EVERY,
            values: {
              AND: this.createValue(['2019'], cronCore.Mode.AND),
              RANGE: this.createValue(['2019', '2019'], cronCore.Mode.RANGE),
              INCREMENT: this.createValue(['2019', '1'], cronCore.Mode.INCREMENT),
              EVERY: this.createValue(['*'], cronCore.Mode.EVERY)
            }
          }
        };
      }

      QuartzCronService.prototype.setView = function (segment, viewItem) {
        this.view[segment] = Object.assign({}, viewItem);
      };

      QuartzCronService.prototype.getView = function (segment) {
        return Object.assign({}, this.view[segment]);
      };

      QuartzCronService.prototype.toString = function () {
        var m = this.genDataModel();
        return this.coreService.toString(m);
      };

      QuartzCronService.prototype.fillFromExpression = function (cronExpression) {
        var _this = this;

        var m = this.coreService.toModel(cronExpression);
        Object.keys(m).forEach(function (prop) {
          _this.view[prop].selected = m[prop].mode;
          _this.view[prop].values[m[prop].mode] = m[prop];
          _this.view[prop] = Object.assign({}, _this.view[prop]);
        });
      };

      QuartzCronService.prototype.hasValue = function (value, type, mode) {
        var values = this.getValues(type, mode);
        return !!~values.indexOf(value);
      };

      QuartzCronService.prototype.getValues = function (type, mode) {
        var store = this.view[type];
        return store.values[mode].values.concat();
      };

      QuartzCronService.prototype.genDataModel = function () {
        var _this = this;

        var m = new cronCore.DataModel();
        Object.keys(this.view).forEach(function (prop) {
          var i = _this.view[prop];
          var selected = i.selected;
          var value = i.values[selected];
          value.mode = i.selected;
          m[prop] = value;
        });
        return m;
      };

      QuartzCronService.prototype.createValue = function (values, mode) {
        return new cronCore.ValueModel({
          values: values,
          mode: mode
        });
      };

      return QuartzCronService;
    }();

    var QuartzCronDI =
    /** @class */
    function () {
      function QuartzCronDI() {}

      QuartzCronDI.get = function (session) {
        if (!this.map.has(session)) {
          this.create(session);
        }

        return this.map.get(session);
      };

      QuartzCronDI.destroy = function (session) {
        this.map["delete"](session);
      };

      QuartzCronDI.create = function (session) {
        var inst = new QuartzCronService(new cronCore.CoreService());
        this.map.set(session, inst);
      };

      QuartzCronDI.map = new Map();
      return QuartzCronDI;
    }();

    var CronBaseComponent =
    /** @class */
    function (_super) {
      __extends(CronBaseComponent, _super);

      function CronBaseComponent(props, session) {
        var _this = _super.call(this, props) || this;

        _this.session = session;
        return _this;
      }

      CronBaseComponent.prototype.getCssClassPrefix = function () {
        return this.props.cssClassPrefix || '';
      };

      CronBaseComponent.prototype.genClassName = function (classes, noPrefixClasses) {
        var _this = this;

        if (noPrefixClasses === void 0) {
          noPrefixClasses = [];
        }

        var prefixed = classes.map(function (c) {
          return _this.getCssClassPrefix() + c;
        });
        return prefixed.concat(noPrefixClasses).join(' ');
      };

      CronBaseComponent.prototype.getQuartzCron = function () {
        return QuartzCronDI.get(this.session);
      };

      return CronBaseComponent;
    }(React.Component);

    var TabBaseComponent =
    /** @class */
    function (_super) {
      __extends(TabBaseComponent, _super);

      function TabBaseComponent(props, segments) {
        var _this = _super.call(this, props, props.session) || this;

        _this.segments = segments;
        _this.sessionId = Date.now().toString();
        return _this;
      }

      TabBaseComponent.prototype.genId = function (mode, extra) {
        return mode + "-" + extra + this.sessionId;
      };

      TabBaseComponent.prototype.inSpecificsList = function (value, mode, segment) {
        return this.getQuartzCron().hasValue(value, segment, mode);
      };

      TabBaseComponent.prototype.applyChanges = function () {
        var _this = this;

        var newState = {};
        this.segments.forEach(function (s) {
          newState[s] = _this.getView(s);
        });
        this.setState(__assign(__assign({}, this.state), newState));
        this.props.onChange();
      };

      TabBaseComponent.prototype.setInValue = function (mode, index, value, segment) {
        var view = this.getView(segment);
        var values = view.values[mode].values;
        values[index] = value;
        this.setView(segment, view);
        this.applyChanges();
      };

      TabBaseComponent.prototype.isDisabled = function (mode, segment) {
        var disabled = this.props.disabled;

        if (segment && mode) {
          var view = this.getView(segment);
          disabled = disabled || view.selected !== mode;
        }

        return disabled;
      };

      TabBaseComponent.prototype.getValues = function (mode, segment) {
        return this.getQuartzCron().getValues(segment, mode);
      };

      TabBaseComponent.prototype.getView = function (segment) {
        return this.getQuartzCron().getView(segment);
      };

      TabBaseComponent.prototype.setView = function (segment, view) {
        return this.getQuartzCron().setView(segment, view);
      };

      TabBaseComponent.prototype.toggleSpecifics = function (value, mode, segment) {
        var view = this.getView(segment);
        var values = view.values[mode].values;
        var isRemoving = !!~values.indexOf(value);

        if (isRemoving && values.length === 1) {
          this.applyChanges();
          return;
        }

        if (isRemoving) {
          var i = values.indexOf(value);
          values.splice(i, 1);
        } else {
          values.push(value);
        }

        this.setView(segment, view);
        this.applyChanges();
      };

      TabBaseComponent.prototype.toggleSpecifics2 = function (value, mode, segment) {
        var view = this.getView(segment);
        var values = view.values[mode].values;
        var isRemoving = !!~values.indexOf(value);

        if (isRemoving && values.length === 1) {
          this.applyChanges();
          return;
        }

        values.push(value);
        values.splice(0, values.length - 1);

        this.setView(segment, view);
        this.applyChanges();
      };

      return TabBaseComponent;
    }(CronBaseComponent);

    var ReCronDay =
    /** @class */
    function (_super) {
      __extends(ReCronDay, _super);

      function ReCronDay(props) {
        var _this = _super.call(this, props, [cronCore.Segment.dayOfMonth, cronCore.Segment.dayOfWeek]) || this;

        var coreService = new cronCore.CoreService();
        var daysOfMonthEvery = coreService.getList(cronCore.Segment.dayOfMonth, true);
        _this.state = {
          daysOfWeekEvery: coreService.getList(cronCore.Segment.dayOfWeek, true),
          daysOfWeek: coreService.getList(cronCore.Segment.dayOfWeek),
          daysOfWeekCodes: coreService.getDaysOfWeekCodes(),
          daysOfMonthEvery: daysOfMonthEvery,
          daysOfMonth: coreService.getList(cronCore.Segment.dayOfMonth),
          limitedDaysOfMonth: daysOfMonthEvery.slice(0, 5),
          dayOfMonth: _this.getView(cronCore.Segment.dayOfMonth),
          dayOfWeek: _this.getView(cronCore.Segment.dayOfWeek)
        };
        return _this;
      }

      ReCronDay.prototype.render = function () {
        return React.createElement("div", null, this.genEvery(), this.genDayOfWeekIncrement(), this.genDayOfMonthIncrement(), this.genDayOfWeekAnd(), this.genDayOfMonthAnd(), this.genDayOfMonthLastDay(), this.genDayOfMonthLastDayWeek(), this.genDayOfWeekLastNTHDayWeek(), this.genDayOfMonthDaysBeforeEndMonth(), this.genDayOfMonthNearestWeekDayOfMonth(), this.genDayOfWeekNTHWeekDayOfMonth());
      };

      ReCronDay.prototype.genEvery = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-every-weekday'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-every-weekday-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-every-weekday-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.EVERY, cronCore.Segment.dayOfWeek),
          value: cronCore.Mode.EVERY,
          checked: this.state.dayOfWeek.selected === cronCore.Mode.EVERY,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setEvery();
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-every-weekday-option-label']),
          htmlFor: this.genId(cronCore.Mode.EVERY, cronCore.Segment.dayOfWeek)
        }, "Every day")));
      };

      ReCronDay.prototype.genDayOfWeekIncrement = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-increment-weekday'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-increment-weekday-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-increment-weekday-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfWeek),
          value: cronCore.Mode.INCREMENT,
          checked: this.state.dayOfWeek.selected === cronCore.Mode.INCREMENT,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfWeek, cronCore.Segment.dayOfMonth);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-increment-weekday-option-label']),
          htmlFor: this.genId(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfWeek)
        }, "Every")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-weekday-every']),
          disabled: this.isDisabled(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfWeek),
          value: this.getValues(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfWeek)[1],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.INCREMENT, 1, e.target.value, cronCore.Segment.dayOfWeek);
          }
        }, this.state.daysOfWeekEvery.map(function (item) {
          return React.createElement("option", {
            value: item.value,
            key: item.value
          }, item.value);
        })), React.createElement("label", {
          className: "c-increment-weekday-option-label2",
          htmlFor: this.genId(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfWeek)
        }, "day(s) starting on"), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-weekday-from']),
          disabled: this.isDisabled(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfWeek),
          value: this.getValues(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfWeek)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.INCREMENT, 0, e.target.value, cronCore.Segment.dayOfWeek);
          }
        }, this.state.daysOfWeek.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })));
      };

      ReCronDay.prototype.genDayOfMonthIncrement = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-increment-monthday'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-increment-monthday-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-increment-monthday-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfMonth),
          value: cronCore.Mode.INCREMENT,
          checked: this.state.dayOfMonth.selected === cronCore.Mode.INCREMENT,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfMonth, cronCore.Segment.dayOfWeek);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-increment-monthday-option-label']),
          htmlFor: this.genId(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfMonth)
        }, "Every")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-monthday-every']),
          disabled: this.isDisabled(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfMonth),
          value: this.getValues(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfMonth)[1],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.INCREMENT, 1, e.target.value, cronCore.Segment.dayOfMonth);
          }
        }, this.state.daysOfMonth.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.value);
        })), React.createElement("label", {
          className: "c-increment-monthday-option-label2",
          htmlFor: this.genId(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfMonth)
        }, "day(s) starting on the"), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-monthday-from']),
          disabled: this.isDisabled(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfMonth),
          value: this.getValues(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfMonth)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.INCREMENT, 0, e.target.value, cronCore.Segment.dayOfMonth);
          }
        }, this.state.daysOfMonthEvery.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })), React.createElement("label", {
          className: "c-increment-monthday-option-label3",
          htmlFor: this.genId(cronCore.Mode.INCREMENT, cronCore.Segment.dayOfMonth)
        }, "of the month"));
      };

      ReCronDay.prototype.genDayOfWeekAnd = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-and-weekday'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-and-weekday-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-and-weekday-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.AND, cronCore.Segment.dayOfWeek),
          value: cronCore.Mode.INCREMENT,
          checked: this.state.dayOfWeek.selected === cronCore.Mode.AND,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.AND, cronCore.Segment.dayOfWeek, cronCore.Segment.dayOfMonth);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-and-weekday-option-label']),
          htmlFor: this.genId(cronCore.Mode.AND, cronCore.Segment.dayOfWeek)
        }, "Specific day of week (choose one or many)")), React.createElement("div", {
          className: this.genClassName(['row', 'pl-3', 'pt-1'], ['c-and-weekday-list'])
        }, this.state.daysOfWeekCodes.map(function (item) {
          return React.createElement("div", {
            className: _this.genClassName(['col-2'], ['c-and-weekday-item']),
            "item-value": item.value,
            key: item.value
          }, React.createElement("div", {
            className: _this.genClassName(['form-check'], ['c-and-weekday-item-check'])
          }, React.createElement("input", {
            className: _this.genClassName(['form-check-input'], ['c-and-weekday-item-field']),
            type: "checkbox",
            id: _this.genId(cronCore.Mode.AND, cronCore.Segment.dayOfWeek + item.value),
            value: item.value,
            disabled: _this.isDisabled(cronCore.Mode.AND, cronCore.Segment.dayOfWeek),
            checked: _this.inSpecificsList(item.value, cronCore.Mode.AND, cronCore.Segment.dayOfWeek),
            onChange: function onChange() {
              return _this.toggleSpecifics(item.value, cronCore.Mode.AND, cronCore.Segment.dayOfWeek);
            }
          }), React.createElement("label", {
            className: _this.genClassName(['form-check-label'], ['c-and-weekday-item-label']),
            htmlFor: _this.genId(cronCore.Mode.AND, cronCore.Segment.dayOfWeek + item.value)
          }, item.label)));
        })));
      };

      ReCronDay.prototype.genDayOfMonthAnd = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-and-monthday'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-and-monthday-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-and-monthday-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.AND, cronCore.Segment.dayOfMonth),
          value: cronCore.Mode.INCREMENT,
          checked: this.state.dayOfMonth.selected === cronCore.Mode.AND,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.AND, cronCore.Segment.dayOfMonth, cronCore.Segment.dayOfWeek);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-and-monthday-option-label']),
          htmlFor: this.genId(cronCore.Mode.AND, cronCore.Segment.dayOfMonth)
        }, "Specific day of month (choose one or many)")), React.createElement("div", {
          className: this.genClassName(['row', 'pl-3', 'pt-1'], ['c-and-monthday-list'])
        }, this.state.daysOfMonth.map(function (item) {
          return React.createElement("div", {
            className: _this.genClassName(['col-1'], ['c-and-monthday-item']),
            "item-value": item.value,
            key: item.value
          }, React.createElement("div", {
            className: _this.genClassName(['form-check'], ['c-and-monthday-item-check'])
          }, React.createElement("input", {
            className: _this.genClassName(['form-check-input'], ['c-and-monthday-item-field']),
            type: "checkbox",
            id: _this.genId(cronCore.Mode.AND, cronCore.Segment.dayOfMonth + item.value),
            value: item.value,
            disabled: _this.isDisabled(cronCore.Mode.AND, cronCore.Segment.dayOfMonth),
            checked: _this.inSpecificsList(item.value, cronCore.Mode.AND, cronCore.Segment.dayOfMonth),
            onChange: function onChange() {
              return _this.toggleSpecifics(item.value, cronCore.Mode.AND, cronCore.Segment.dayOfMonth);
            }
          }), React.createElement("label", {
            className: _this.genClassName(['form-check-label'], ['c-and-monthday-item-label']),
            htmlFor: _this.genId(cronCore.Mode.AND, cronCore.Segment.dayOfMonth + item.value)
          }, item.label)));
        })));
      };

      ReCronDay.prototype.genDayOfMonthLastDay = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-last-monthday'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-last-monthday-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-last-monthday-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.LAST_DAY, cronCore.Segment.dayOfMonth),
          value: cronCore.Mode.LAST_DAY,
          checked: this.state.dayOfMonth.selected === cronCore.Mode.LAST_DAY,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.LAST_DAY, cronCore.Segment.dayOfMonth, cronCore.Segment.dayOfWeek, 'L');
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-last-monthday-option-label']),
          htmlFor: this.genId(cronCore.Mode.LAST_DAY, cronCore.Segment.dayOfMonth)
        }, "On the last day of the month")));
      };

      ReCronDay.prototype.genDayOfMonthLastDayWeek = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-last-weekday'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-last-weekday-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-last-weekday-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.LAST_DAY_WEEK, cronCore.Segment.dayOfMonth),
          value: cronCore.Mode.LAST_DAY_WEEK,
          checked: this.state.dayOfMonth.selected === cronCore.Mode.LAST_DAY_WEEK,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.LAST_DAY_WEEK, cronCore.Segment.dayOfMonth, cronCore.Segment.dayOfWeek, 'LW');
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-last-weekday-option-label']),
          htmlFor: this.genId(cronCore.Mode.LAST_DAY_WEEK, cronCore.Segment.dayOfMonth)
        }, "On the last weekday of the month")));
      };

      ReCronDay.prototype.genDayOfWeekLastNTHDayWeek = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-last-nth'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-last-nth-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-last-nth-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.LAST_NTH_DAY_WEEK, cronCore.Segment.dayOfWeek),
          value: cronCore.Mode.LAST_NTH_DAY_WEEK,
          checked: this.state.dayOfWeek.selected === cronCore.Mode.LAST_NTH_DAY_WEEK,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.LAST_NTH_DAY_WEEK, cronCore.Segment.dayOfWeek, cronCore.Segment.dayOfMonth);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-last-nth-option-label']),
          htmlFor: this.genId(cronCore.Mode.LAST_NTH_DAY_WEEK, cronCore.Segment.dayOfWeek)
        }, "On the last")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-last-nth-weekday']),
          disabled: this.isDisabled(cronCore.Mode.LAST_NTH_DAY_WEEK, cronCore.Segment.dayOfWeek),
          value: this.getValues(cronCore.Mode.LAST_NTH_DAY_WEEK, cronCore.Segment.dayOfWeek)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.LAST_NTH_DAY_WEEK, 0, e.target.value, cronCore.Segment.dayOfWeek);
          }
        }, this.state.daysOfWeek.map(function (item) {
          return React.createElement("option", {
            value: item.value + 'L',
            key: item.value + 'L'
          }, item.label);
        })), React.createElement("label", {
          className: "c-last-nth-option-label2",
          htmlFor: this.genId(cronCore.Mode.LAST_NTH_DAY_WEEK, cronCore.Segment.dayOfWeek)
        }, "of the month"));
      };

      ReCronDay.prototype.genDayOfMonthDaysBeforeEndMonth = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-day-before-end'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-day-before-end-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-day-before-end-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.DAYS_BEFORE_END_MONTH, cronCore.Segment.dayOfMonth),
          value: cronCore.Mode.DAYS_BEFORE_END_MONTH,
          checked: this.state.dayOfMonth.selected === cronCore.Mode.DAYS_BEFORE_END_MONTH,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.DAYS_BEFORE_END_MONTH, cronCore.Segment.dayOfMonth, cronCore.Segment.dayOfWeek);
          }
        })), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-day-before-end-monthday']),
          disabled: this.isDisabled(cronCore.Mode.DAYS_BEFORE_END_MONTH, cronCore.Segment.dayOfMonth),
          value: this.getValues(cronCore.Mode.DAYS_BEFORE_END_MONTH, cronCore.Segment.dayOfMonth)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.DAYS_BEFORE_END_MONTH, 0, e.target.value, cronCore.Segment.dayOfMonth);
          }
        }, this.state.daysOfMonth.map(function (item) {
          return React.createElement("option", {
            value: 'L-' + item.value,
            key: 'L-' + item.value
          }, item.label);
        })), React.createElement("label", {
          className: "c-day-before-end-option-label",
          htmlFor: this.genId(cronCore.Mode.DAYS_BEFORE_END_MONTH, cronCore.Segment.dayOfMonth)
        }, "day(s) before the end of the month"));
      };

      ReCronDay.prototype.genDayOfMonthNearestWeekDayOfMonth = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-nearest'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-nearest-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-nearest-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.NEAREST_WEEKDAY_OF_MONTH, cronCore.Segment.dayOfMonth),
          value: cronCore.Mode.NEAREST_WEEKDAY_OF_MONTH,
          checked: this.state.dayOfMonth.selected === cronCore.Mode.NEAREST_WEEKDAY_OF_MONTH,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.NEAREST_WEEKDAY_OF_MONTH, cronCore.Segment.dayOfMonth, cronCore.Segment.dayOfWeek);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-nearest-option-label']),
          htmlFor: this.genId(cronCore.Mode.NEAREST_WEEKDAY_OF_MONTH, cronCore.Segment.dayOfMonth)
        }, "Nearest weekday (Monday to Friday) to the")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-nearest-monthday']),
          disabled: this.isDisabled(cronCore.Mode.NEAREST_WEEKDAY_OF_MONTH, cronCore.Segment.dayOfMonth),
          value: this.getValues(cronCore.Mode.NEAREST_WEEKDAY_OF_MONTH, cronCore.Segment.dayOfMonth)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.NEAREST_WEEKDAY_OF_MONTH, 0, e.target.value, cronCore.Segment.dayOfMonth);
          }
        }, this.state.daysOfMonthEvery.map(function (item) {
          return React.createElement("option", {
            key: item.value + 'W',
            value: item.value + 'W'
          }, item.label);
        })), React.createElement("label", {
          className: "c-nearest-option-label2",
          htmlFor: this.genId(cronCore.Mode.NEAREST_WEEKDAY_OF_MONTH, cronCore.Segment.dayOfMonth)
        }, "of the month"));
      };

      ReCronDay.prototype.genDayOfWeekNTHWeekDayOfMonth = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-nth'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-nth-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-nth-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.NTH_WEEKDAY_OF_MONTH, cronCore.Segment.dayOfWeek),
          value: cronCore.Mode.NTH_WEEKDAY_OF_MONTH,
          checked: this.state.dayOfWeek.selected === cronCore.Mode.NTH_WEEKDAY_OF_MONTH,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.NTH_WEEKDAY_OF_MONTH, cronCore.Segment.dayOfWeek, cronCore.Segment.dayOfMonth);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-nth-option-label']),
          htmlFor: this.genId(cronCore.Mode.NTH_WEEKDAY_OF_MONTH, cronCore.Segment.dayOfWeek)
        }, "On the")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-nth-every']),
          disabled: this.isDisabled(cronCore.Mode.NTH_WEEKDAY_OF_MONTH, cronCore.Segment.dayOfWeek),
          value: this.getValues(cronCore.Mode.NTH_WEEKDAY_OF_MONTH, cronCore.Segment.dayOfWeek)[1],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.NTH_WEEKDAY_OF_MONTH, 1, e.target.value, cronCore.Segment.dayOfWeek);
          }
        }, this.state.limitedDaysOfMonth.map(function (item) {
          return React.createElement("option", {
            value: item.value,
            key: item.value
          }, item.label);
        })), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-nth-every-weekday']),
          disabled: this.isDisabled(cronCore.Mode.NTH_WEEKDAY_OF_MONTH, cronCore.Segment.dayOfWeek),
          value: this.getValues(cronCore.Mode.NTH_WEEKDAY_OF_MONTH, cronCore.Segment.dayOfWeek)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.NTH_WEEKDAY_OF_MONTH, 0, e.target.value, cronCore.Segment.dayOfWeek);
          }
        }, this.state.daysOfWeek.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })), React.createElement("label", {
          className: "c-nth-option-label2",
          htmlFor: this.genId(cronCore.Mode.NTH_WEEKDAY_OF_MONTH, cronCore.Segment.dayOfWeek)
        }, "of the month"));
      };

      ReCronDay.prototype.setEvery = function () {
        var dayOfMonth = this.getView(cronCore.Segment.dayOfMonth);
        dayOfMonth.values.NONE.values = ['?'];
        dayOfMonth.selected = cronCore.Mode.NONE;
        this.setView(cronCore.Segment.dayOfMonth, dayOfMonth);
        var dayOfWeek = this.getView(cronCore.Segment.dayOfWeek);
        dayOfWeek.values.EVERY.values = ['*'];
        dayOfWeek.selected = cronCore.Mode.EVERY;
        this.setView(cronCore.Segment.dayOfWeek, dayOfWeek);
        this.applyChanges();
      };

      ReCronDay.prototype.setSelected = function (mode, segment, reset, value) {
        var view = this.getView(segment);
        view.selected = mode;
        this.setView(segment, view);

        if (reset === cronCore.Segment.dayOfMonth) {
          this.resetsDaysOfMonth();
        }

        if (reset === cronCore.Segment.dayOfWeek) {
          this.resetDaysOfWeek();
        }

        if (value) {
          this.setInValue(mode, 0, value, segment);
        }

        this.applyChanges();
      };

      ReCronDay.prototype.resetsDaysOfMonth = function () {
        var dayOfMonth = this.getView(cronCore.Segment.dayOfMonth);
        dayOfMonth.selected = cronCore.Mode.NONE;
        dayOfMonth.values.NONE.values = ['?'];
        this.setView(cronCore.Segment.dayOfMonth, dayOfMonth);
      };

      ReCronDay.prototype.resetDaysOfWeek = function () {
        var dayOfWeek = this.getView(cronCore.Segment.dayOfWeek);
        dayOfWeek.selected = cronCore.Mode.NONE;
        dayOfWeek.values.NONE.values = ['?'];
        this.setView(cronCore.Segment.dayOfWeek, dayOfWeek);
      };

      return ReCronDay;
    }(TabBaseComponent);

    var TabSingleSegmentComponent =
    /** @class */
    function (_super) {
      __extends(TabSingleSegmentComponent, _super);

      function TabSingleSegmentComponent(props, segment) {
        var _this = _super.call(this, props, [segment]) || this;

        _this.segment = segment;
        return _this;
      }

      TabSingleSegmentComponent.prototype.render = function () {
        return React.createElement("div", null, this.genEvery(), this.genIncrement(), this.genAnd(), this.genRange());
      };

      TabSingleSegmentComponent.prototype.setEvery = function () {
        var view = this.getView(this.segment);
        view.values.EVERY.values = ['*'];
        this.setView(this.segment, view);
        this.setSelected(cronCore.Mode.EVERY);
      };

      TabSingleSegmentComponent.prototype.setSelected = function (mode) {
        var view = this.getView(this.segment);
        view.selected = mode;
        this.setView(this.segment, view);
        this.applyChanges();
      };

      TabSingleSegmentComponent.prototype.setInValue = function (mode, index, value) {
        _super.prototype.setInValue.call(this, mode, index, value, this.segment);
      };

      TabSingleSegmentComponent.prototype.inSpecificsList = function (value, mode) {
        return _super.prototype.inSpecificsList.call(this, value, mode, this.segment);
      };

      TabSingleSegmentComponent.prototype.getValues = function (mode) {
        return _super.prototype.getValues.call(this, mode, this.segment);
      };

      TabSingleSegmentComponent.prototype.toggleSpecifics = function (value, mode) {
        _super.prototype.toggleSpecifics.call(this, value, mode, this.segment);
      };

      TabSingleSegmentComponent.prototype.toggleSpecifics2 = function (value, mode) {
        _super.prototype.toggleSpecifics2.call(this, value, mode, this.segment);
      };

      TabSingleSegmentComponent.prototype.isDisabled = function (mode) {
        return _super.prototype.isDisabled.call(this, mode, this.segment);
      };

      return TabSingleSegmentComponent;
    }(TabBaseComponent);

    var ReCronHour =
    /** @class */
    function (_super) {
      __extends(ReCronHour, _super);

      function ReCronHour(props) {
        var _this = _super.call(this, props, cronCore.Segment.hours) || this;

        var coreService = new cronCore.CoreService();
        _this.state = {
          hourCodes: coreService.getList(cronCore.Segment.hours, true),
          hoursList: coreService.getList(cronCore.Segment.hours),
          hours: _this.getView(cronCore.Segment.hours)
        };
        return _this;
      }

      ReCronHour.prototype.genEvery = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-every'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-every-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-every-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.EVERY),
          value: cronCore.Mode.EVERY,
          checked: this.state.hours.selected === cronCore.Mode.EVERY,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            _this.setEvery();
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-every-option-label']),
          htmlFor: this.genId(cronCore.Mode.EVERY)
        }, "Every hour")));
      };

      ReCronHour.prototype.genIncrement = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-increment'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-increment-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-increment-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.INCREMENT),
          value: cronCore.Mode.INCREMENT,
          checked: this.state.hours.selected === cronCore.Mode.INCREMENT,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.INCREMENT);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-increment-option-label']),
          htmlFor: this.genId(cronCore.Mode.INCREMENT)
        }, "Every")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-every']),
          disabled: this.isDisabled(cronCore.Mode.INCREMENT),
          value: this.getValues(cronCore.Mode.INCREMENT)[1],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.INCREMENT, 1, e.target.value);
          }
        }, this.state.hourCodes.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.value);
        })), React.createElement("label", {
          className: "c-increment-option-label2",
          htmlFor: this.genId(cronCore.Mode.INCREMENT)
        }, "hour(s) starting at hour"), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'ml-1'], ['c-increment-from']),
          disabled: this.isDisabled(cronCore.Mode.INCREMENT),
          value: this.getValues(cronCore.Mode.INCREMENT)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.INCREMENT, 0, e.target.value);
          }
        }, this.state.hoursList.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })));
      };

      ReCronHour.prototype.genAnd = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-and'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-and-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-and-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.AND),
          value: cronCore.Mode.AND,
          checked: this.state.hours.selected === cronCore.Mode.AND,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.AND);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-and-option-label']),
          htmlFor: this.genId(cronCore.Mode.AND)
        }, "Choose hour")), React.createElement("div", {
          className: this.genClassName(['row', 'pl-3', 'pt-1'], ['c-and-list'])
        }, this.state.hoursList.map(function (item) {
          return React.createElement("div", {
            className: _this.genClassName(['col-1'], ['c-and-item']),
            "item-value": item.value,
            key: _this.genId(cronCore.Mode.AND, item.value)
          }, React.createElement("div", {
            className: _this.genClassName(['form-check'], ['c-and-item-check'])
          }, React.createElement("input", {
            className: _this.genClassName(['form-check-input'], ['c-and-item-field']),
            type: "checkbox",
            id: _this.genId(cronCore.Mode.AND, item.value),
            value: item.value,
            disabled: _this.isDisabled(cronCore.Mode.AND),
            checked: _this.inSpecificsList(item.value, cronCore.Mode.AND),
            onChange: function onChange() {
              return _this.toggleSpecifics(item.value, cronCore.Mode.AND);
            }
          }), React.createElement("label", {
            className: _this.genClassName(['form-check-label'], ['c-and-item-label']),
            htmlFor: _this.genId(cronCore.Mode.AND, item.value)
          }, item.label)));
        })));
      };

      ReCronHour.prototype.genRange = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-range'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-range-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-range-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.RANGE),
          value: cronCore.Mode.RANGE,
          checked: this.state.hours.selected === cronCore.Mode.RANGE,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.RANGE);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-range-option-label']),
          htmlFor: this.genId(cronCore.Mode.RANGE)
        }, "Every hour between hour")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-range-from']),
          disabled: this.isDisabled(cronCore.Mode.RANGE),
          value: this.getValues(cronCore.Mode.RANGE)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.RANGE, 0, e.target.value);
          }
        }, this.state.hoursList.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })), React.createElement("label", {
          className: "c-range-option-label2",
          htmlFor: this.genId(cronCore.Mode.RANGE)
        }, "and hour"), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'ml-1'], ['c-range-to']),
          disabled: this.isDisabled(cronCore.Mode.RANGE),
          value: this.getValues(cronCore.Mode.RANGE)[1],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.RANGE, 1, e.target.value);
          }
        }, this.state.hoursList.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })));
      };

      return ReCronHour;
    }(TabSingleSegmentComponent);

    var ReCronMinute =
    /** @class */
    function (_super) {
      __extends(ReCronMinute, _super);

      function ReCronMinute(props) {
        var _this = _super.call(this, props, cronCore.Segment.minutes) || this;

        var coreService = new cronCore.CoreService();
        _this.state = {
          minuteCodes: coreService.getList(cronCore.Segment.minutes, true),
          minutesList: coreService.getList(cronCore.Segment.minutes),
          minutes: _this.getView(cronCore.Segment.minutes)
        };
        return _this;
      }

      ReCronMinute.prototype.genEvery = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-every'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-every-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-every-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.EVERY),
          value: cronCore.Mode.EVERY,
          checked: this.state.minutes.selected === cronCore.Mode.EVERY,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            _this.setEvery();
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-every-option-label']),
          htmlFor: this.genId(cronCore.Mode.EVERY)
        }, "Every minute")));
      };

      ReCronMinute.prototype.genIncrement = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-increment'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-increment-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-increment-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.INCREMENT),
          value: cronCore.Mode.INCREMENT,
          checked: this.state.minutes.selected === cronCore.Mode.INCREMENT,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.INCREMENT);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-increment-option-label']),
          htmlFor: this.genId(cronCore.Mode.INCREMENT)
        }, "Every")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-every']),
          disabled: this.isDisabled(cronCore.Mode.INCREMENT),
          value: this.getValues(cronCore.Mode.INCREMENT)[1],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.INCREMENT, 1, e.target.value);
          }
        }, this.state.minuteCodes.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.value);
        })), React.createElement("label", {
          className: "c-increment-option-label2",
          htmlFor: this.genId(cronCore.Mode.INCREMENT)
        }, "minute(s) starting at minute"), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'ml-1'], ['c-increment-from']),
          disabled: this.isDisabled(cronCore.Mode.INCREMENT),
          value: this.getValues(cronCore.Mode.INCREMENT)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.INCREMENT, 0, e.target.value);
          }
        }, this.state.minutesList.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })));
      };

      ReCronMinute.prototype.genAnd = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-and'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-and-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-and-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.AND),
          value: cronCore.Mode.AND,
          checked: this.state.minutes.selected === cronCore.Mode.AND,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.AND);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-and-option-label']),
          htmlFor: this.genId(cronCore.Mode.AND)
        }, "Specific minute (choose one or many)")), React.createElement("div", {
          className: this.genClassName(['row', 'pl-3', 'pt-1'], ['c-and-list'])
        }, this.state.minutesList.map(function (item) {
          return React.createElement("div", {
            className: _this.genClassName(['col-1'], ['c-and-item']),
            "item-value": item.value,
            key: _this.genId(cronCore.Mode.AND, item.value)
          }, React.createElement("div", {
            className: _this.genClassName(['form-check'], ['c-and-item-check'])
          }, React.createElement("input", {
            className: _this.genClassName(['form-check-input'], ['c-and-item-field']),
            type: "checkbox",
            id: _this.genId(cronCore.Mode.AND, item.value),
            value: item.value,
            disabled: _this.isDisabled(cronCore.Mode.AND),
            checked: _this.inSpecificsList(item.value, cronCore.Mode.AND),
            onChange: function onChange() {
              return _this.toggleSpecifics(item.value, cronCore.Mode.AND);
            }
          }), React.createElement("label", {
            className: _this.genClassName(['form-check-label'], ['c-and-item-label']),
            htmlFor: _this.genId(cronCore.Mode.AND, item.value)
          }, item.label)));
        })));
      };

      ReCronMinute.prototype.genRange = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-range'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-range-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-range-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.RANGE),
          value: cronCore.Mode.RANGE,
          checked: this.state.minutes.selected === cronCore.Mode.RANGE,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.RANGE);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-range-option-label']),
          htmlFor: this.genId(cronCore.Mode.RANGE)
        }, "Every minute between minute")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-range-from']),
          disabled: this.isDisabled(cronCore.Mode.RANGE),
          value: this.getValues(cronCore.Mode.RANGE)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.RANGE, 0, e.target.value);
          }
        }, this.state.minutesList.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })), React.createElement("label", {
          className: "c-range-option-label2",
          htmlFor: this.genId(cronCore.Mode.RANGE)
        }, "and minute"), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'ml-1'], ['c-range-to']),
          disabled: this.isDisabled(cronCore.Mode.RANGE),
          value: this.getValues(cronCore.Mode.RANGE)[1],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.RANGE, 1, e.target.value);
          }
        }, this.state.minutesList.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })));
      };

      return ReCronMinute;
    }(TabSingleSegmentComponent);

    var ReCronMonth =
    /** @class */
    function (_super) {
      __extends(ReCronMonth, _super);

      function ReCronMonth(props) {
        var _this = _super.call(this, props, cronCore.Segment.month) || this;

        var coreService = new cronCore.CoreService();
        _this.state = {
          monthCodes: coreService.getMonthCodes(),
          monthes: coreService.getList(cronCore.Segment.month),
          month: _this.getView(cronCore.Segment.month)
        };
        return _this;
      }

      ReCronMonth.prototype.genEvery = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-every'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-every-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-every-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.EVERY),
          value: cronCore.Mode.EVERY,
          checked: this.state.month.selected === cronCore.Mode.EVERY,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            _this.setEvery();
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-every-option-label']),
          htmlFor: this.genId(cronCore.Mode.EVERY)
        }, "Every month")));
      };

      ReCronMonth.prototype.genIncrement = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-increment'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-increment-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-increment-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.INCREMENT),
          value: cronCore.Mode.INCREMENT,
          checked: this.state.month.selected === cronCore.Mode.INCREMENT,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.INCREMENT);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-increment-option-label']),
          htmlFor: this.genId(cronCore.Mode.INCREMENT)
        }, "Every")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-every']),
          disabled: this.isDisabled(cronCore.Mode.INCREMENT),
          value: this.getValues(cronCore.Mode.INCREMENT)[1],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.INCREMENT, 1, e.target.value);
          }
        }, this.state.monthes.map(function (item, i) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, i + 1);
        })), React.createElement("label", {
          className: "c-increment-option-label2",
          htmlFor: this.genId(cronCore.Mode.INCREMENT)
        }, "month(s) starting at month"), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'ml-1'], ['c-increment-from']),
          disabled: this.isDisabled(cronCore.Mode.INCREMENT),
          value: this.getValues(cronCore.Mode.INCREMENT)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.INCREMENT, 0, e.target.value);
          }
        }, this.state.monthes.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })));
      };

      ReCronMonth.prototype.genAnd = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-and'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-and-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-and-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.AND),
          value: cronCore.Mode.AND,
          checked: this.state.month.selected === cronCore.Mode.AND,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.AND);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-and-option-label']),
          htmlFor: this.genId(cronCore.Mode.AND)
        }, "Specific month (choose one or many)")), React.createElement("div", {
          className: this.genClassName(['row', 'pl-3', 'pt-1'], ['c-and-list'])
        }, this.state.monthCodes.map(function (item) {
          return React.createElement("div", {
            className: _this.genClassName(['col-2'], ['c-and-item']),
            "item-value": item.value,
            key: _this.genId(cronCore.Mode.AND, item.value)
          }, React.createElement("div", {
            className: _this.genClassName(['form-check'], ['c-and-item-check'])
          }, React.createElement("input", {
            className: _this.genClassName(['form-check-input'], ['c-and-item-field']),
            type: "checkbox",
            id: _this.genId(cronCore.Mode.AND, item.value),
            value: item.value,
            disabled: _this.isDisabled(cronCore.Mode.AND),
            checked: _this.inSpecificsList(item.value, cronCore.Mode.AND),
            onChange: function onChange() {
              return _this.toggleSpecifics(item.value, cronCore.Mode.AND);
            }
          }), React.createElement("label", {
            className: _this.genClassName(['form-check-label'], ['c-and-item-label']),
            htmlFor: _this.genId(cronCore.Mode.AND, item.value)
          }, item.label)));
        })));
      };

      ReCronMonth.prototype.genRange = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-range'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-range-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-range-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.RANGE),
          value: cronCore.Mode.RANGE,
          checked: this.state.month.selected === cronCore.Mode.RANGE,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.RANGE);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-range-option-label']),
          htmlFor: this.genId(cronCore.Mode.RANGE)
        }, "Every month between month")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-range-from']),
          disabled: this.isDisabled(cronCore.Mode.RANGE),
          value: this.getValues(cronCore.Mode.RANGE)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.RANGE, 0, e.target.value);
          }
        }, this.state.monthes.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })), React.createElement("label", {
          className: "c-range-option-label2",
          htmlFor: this.genId(cronCore.Mode.RANGE)
        }, "and month"), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'ml-1'], ['c-range-to']),
          disabled: this.isDisabled(cronCore.Mode.RANGE),
          value: this.getValues(cronCore.Mode.RANGE)[1],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.RANGE, 1, e.target.value);
          }
        }, this.state.monthes.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })));
      };

      return ReCronMonth;
    }(TabSingleSegmentComponent);

    var ReCronSecond =
    /** @class */
    function (_super) {
      __extends(ReCronSecond, _super);

      function ReCronSecond(props) {
        var _this = _super.call(this, props, cronCore.Segment.seconds) || this;

        var coreService = new cronCore.CoreService();
        _this.state = {
          secondCodes: coreService.getList(cronCore.Segment.seconds, true),
          secondsList: coreService.getList(cronCore.Segment.seconds),
          seconds: _this.getView(cronCore.Segment.seconds)
        };
        return _this;
      }

      ReCronSecond.prototype.genEvery = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-every'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-every-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-every-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.EVERY),
          value: cronCore.Mode.EVERY,
          checked: this.state.seconds.selected === cronCore.Mode.EVERY,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            _this.setEvery();
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-every-option-label']),
          htmlFor: this.genId(cronCore.Mode.EVERY)
        }, "Every second")));
      };

      ReCronSecond.prototype.genIncrement = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-increment'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-increment-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-increment-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.INCREMENT),
          value: cronCore.Mode.INCREMENT,
          checked: this.state.seconds.selected === cronCore.Mode.INCREMENT,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.INCREMENT);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-increment-option-label']),
          htmlFor: this.genId(cronCore.Mode.INCREMENT)
        }, "Every")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-every']),
          disabled: this.isDisabled(cronCore.Mode.INCREMENT),
          value: this.getValues(cronCore.Mode.INCREMENT)[1],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.INCREMENT, 1, e.target.value);
          }
        }, this.state.secondCodes.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.value);
        })), React.createElement("label", {
          className: "c-increment-option-label2",
          htmlFor: this.genId(cronCore.Mode.INCREMENT)
        }, "second(s) starting at second"), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'ml-1'], ['c-increment-from']),
          disabled: this.isDisabled(cronCore.Mode.INCREMENT),
          value: this.getValues(cronCore.Mode.INCREMENT)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.INCREMENT, 0, e.target.value);
          }
        }, this.state.secondsList.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })));
      };

      ReCronSecond.prototype.genAnd = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-and'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-and-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-and-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.AND),
          value: cronCore.Mode.AND,
          checked: this.state.seconds.selected === cronCore.Mode.AND,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.AND);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-and-option-label']),
          htmlFor: this.genId(cronCore.Mode.AND)
        }, "Specific second (choose one or many)")), React.createElement("div", {
          className: this.genClassName(['row', 'pl-3', 'pt-1'], ['c-and-list'])
        }, this.state.secondsList.map(function (item) {
          return React.createElement("div", {
            className: _this.genClassName(['col-1'], ['c-and-item']),
            "item-value": item.value,
            key: _this.genId(cronCore.Mode.AND, item.value)
          }, React.createElement("div", {
            className: _this.genClassName(['form-check'], ['c-and-item-check'])
          }, React.createElement("input", {
            className: _this.genClassName(['form-check-input'], ['c-and-item-field']),
            type: "checkbox",
            id: _this.genId(cronCore.Mode.AND, item.value),
            value: item.value,
            disabled: _this.isDisabled(cronCore.Mode.AND),
            checked: _this.inSpecificsList(item.value, cronCore.Mode.AND),
            onChange: function onChange() {
              return _this.toggleSpecifics(item.value, cronCore.Mode.AND);
            }
          }), React.createElement("label", {
            className: _this.genClassName(['form-check-label'], ['c-and-item-label']),
            htmlFor: _this.genId(cronCore.Mode.AND, item.value)
          }, item.label)));
        })));
      };

      ReCronSecond.prototype.genRange = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-range'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-range-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-range-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.RANGE),
          value: cronCore.Mode.RANGE,
          checked: this.state.seconds.selected === cronCore.Mode.RANGE,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.RANGE);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-range-option-label']),
          htmlFor: this.genId(cronCore.Mode.RANGE)
        }, "Every second between second")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-range-from']),
          disabled: this.isDisabled(cronCore.Mode.RANGE),
          value: this.getValues(cronCore.Mode.RANGE)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.RANGE, 0, e.target.value);
          }
        }, this.state.secondsList.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })), React.createElement("label", {
          className: "c-range-option-label2",
          htmlFor: this.genId(cronCore.Mode.RANGE)
        }, "and second"), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'ml-1'], ['c-range-to']),
          disabled: this.isDisabled(cronCore.Mode.RANGE),
          value: this.getValues(cronCore.Mode.RANGE)[1],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.RANGE, 1, e.target.value);
          }
        }, this.state.secondsList.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })));
      };

      return ReCronSecond;
    }(TabSingleSegmentComponent);

    var ReCronYear =
    /** @class */
    function (_super) {
      __extends(ReCronYear, _super);

      function ReCronYear(props) {
        var _this = _super.call(this, props, cronCore.Segment.year) || this;

        var coreService = new cronCore.CoreService();
        _this.state = {
          yearCodes: coreService.getList(cronCore.Segment.year, true),
          years: coreService.getList(cronCore.Segment.year),
          year: _this.getView(cronCore.Segment.year)
        };
        return _this;
      }

      ReCronYear.prototype.genEvery = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-every'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-every-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-every-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.EVERY),
          value: cronCore.Mode.EVERY,
          checked: this.state.year.selected === cronCore.Mode.EVERY,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            _this.setEvery();
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-every-option-label']),
          htmlFor: this.genId(cronCore.Mode.EVERY)
        }, "Any year")));
      };

      ReCronYear.prototype.genIncrement = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-increment'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-increment-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-increment-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.INCREMENT),
          value: cronCore.Mode.INCREMENT,
          checked: this.state.year.selected === cronCore.Mode.INCREMENT,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.INCREMENT);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-increment-option-label']),
          htmlFor: this.genId(cronCore.Mode.INCREMENT)
        }, "Every")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-every']),
          disabled: this.isDisabled(cronCore.Mode.INCREMENT),
          value: this.getValues(cronCore.Mode.INCREMENT)[1],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.INCREMENT, 1, e.target.value);
          }
        }, this.state.yearCodes.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.value);
        })), React.createElement("label", {
          className: "c-increment-option-label2",
          htmlFor: this.genId(cronCore.Mode.INCREMENT)
        }, "year(s) starting at year"), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'ml-1'], ['c-increment-from']),
          disabled: this.isDisabled(cronCore.Mode.INCREMENT),
          value: this.getValues(cronCore.Mode.INCREMENT)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.INCREMENT, 0, e.target.value);
          }
        }, this.state.years.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })));
      };

      ReCronYear.prototype.genAnd = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group'], ['c-and'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-and-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-and-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.AND),
          value: cronCore.Mode.AND,
          checked: this.state.year.selected === cronCore.Mode.AND,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.AND);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-and-option-label']),
          htmlFor: this.genId(cronCore.Mode.AND)
        }, "Specific year (choose one or many)")), React.createElement("div", {
          className: this.genClassName(['row', 'pl-3', 'pt-1'], ['c-and-list'])
        }, this.state.years.map(function (item) {
          return React.createElement("div", {
            className: _this.genClassName(['col-1'], ['c-and-item']),
            "item-value": item.value,
            key: _this.genId(cronCore.Mode.AND, item.value)
          }, React.createElement("div", {
            className: _this.genClassName(['form-check'], ['c-and-item-check'])
          }, React.createElement("input", {
            className: _this.genClassName(['form-check-input'], ['c-and-item-field']),
            type: "checkbox",
            id: _this.genId(cronCore.Mode.AND, item.value),
            value: item.value,
            disabled: _this.isDisabled(cronCore.Mode.AND),
            checked: _this.inSpecificsList(item.value, cronCore.Mode.AND),
            onChange: function onChange() {
              return _this.toggleSpecifics(item.value, cronCore.Mode.AND);
            }
          }), React.createElement("label", {
            className: _this.genClassName(['form-check-label'], ['c-and-item-label']),
            htmlFor: _this.genId(cronCore.Mode.AND, item.value)
          }, item.label)));
        })));
      };

      ReCronYear.prototype.genRange = function () {
        var _this = this;

        return React.createElement("div", {
          className: this.genClassName(['form-group', 'form-inline'], ['c-range'])
        }, React.createElement("div", {
          className: this.genClassName(['form-check'], ['c-range-check'])
        }, React.createElement("input", {
          className: this.genClassName(['form-check-input'], ['c-range-option']),
          type: "radio",
          id: this.genId(cronCore.Mode.RANGE),
          value: cronCore.Mode.RANGE,
          checked: this.state.year.selected === cronCore.Mode.RANGE,
          disabled: this.isDisabled(),
          onChange: function onChange() {
            return _this.setSelected(cronCore.Mode.RANGE);
          }
        }), React.createElement("label", {
          className: this.genClassName(['form-check-label'], ['c-range-option-label']),
          htmlFor: this.genId(cronCore.Mode.RANGE)
        }, "Every year between year")), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-range-from']),
          disabled: this.isDisabled(cronCore.Mode.RANGE),
          value: this.getValues(cronCore.Mode.RANGE)[0],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.RANGE, 0, e.target.value);
          }
        }, this.state.years.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })), React.createElement("label", {
          className: "c-range-option-label2",
          htmlFor: this.genId(cronCore.Mode.RANGE)
        }, "and year"), React.createElement("select", {
          className: this.genClassName(['form-control', 'form-control-sm', 'ml-1'], ['c-range-to']),
          disabled: this.isDisabled(cronCore.Mode.RANGE),
          value: this.getValues(cronCore.Mode.RANGE)[1],
          onChange: function onChange(e) {
            return _this.setInValue(cronCore.Mode.RANGE, 1, e.target.value);
          }
        }, this.state.years.map(function (item) {
          return React.createElement("option", {
            key: item.value,
            value: item.value
          }, item.label);
        })));
      };

      return ReCronYear;
    }(TabSingleSegmentComponent);

    var tabs = [{
      label: 'Seconds',
      type: cronCore.Type.SECONDS
    }, {
      label: 'Minutes',
      type: cronCore.Type.MINUTES
    }, {
      label: 'Hours',
      type: cronCore.Type.HOURS
    }, {
      label: 'Day',
      type: cronCore.Type.DAY
    }, {
      label: 'Month',
      type: cronCore.Type.MONTH
    }, {
      label: 'Year',
      type: cronCore.Type.YEAR
    }];

    var ReCron =
    /** @class */
    function (_super) {
      __extends(ReCron, _super);

      function ReCron(props) {
        var _this = _super.call(this, props, Date.now()) || this;

        _this.state = {
          tab: tabs[2],
          session: _this.session
        };
        return _this;
      }

      ReCron.prototype.componentWillUnmount = function () {
        QuartzCronDI.destroy(this.session);
      };

      ReCron.prototype.render = function () {
        this.getQuartzCron().fillFromExpression(this.props.value);
        return React.createElement("div", {
          className: "c-host"
        }, this.genTabs(), React.createElement("div", {
          className: "c-tab-content",
          role: "tabpanel",
          tabIndex: 0,
          "tab-name": this.state.tab.type
        }, this.genContent()));
      };

      ReCron.prototype.genContent = function () {
        var _this = this;

        var second = React.createElement(ReCronSecond, {
          session: this.state.session,
          cssClassPrefix: this.getCssClassPrefix(),
          disabled: this.props.disabled,
          onChange: function onChange() {
            return _this.applyChanges();
          }
        });
        var minute = React.createElement(ReCronMinute, {
          session: this.state.session,
          cssClassPrefix: this.getCssClassPrefix(),
          disabled: this.props.disabled,
          onChange: function onChange() {
            return _this.applyChanges();
          }
        });
        var hour = React.createElement(ReCronHour, {
          session: this.state.session,
          cssClassPrefix: this.getCssClassPrefix(),
          disabled: this.props.disabled,
          onChange: function onChange() {
            return _this.applyChanges();
          }
        });
        var month = React.createElement(ReCronMonth, {
          session: this.state.session,
          cssClassPrefix: this.getCssClassPrefix(),
          disabled: this.props.disabled,
          onChange: function onChange() {
            return _this.applyChanges();
          }
        });
        var year = React.createElement(ReCronYear, {
          session: this.state.session,
          cssClassPrefix: this.getCssClassPrefix(),
          disabled: this.props.disabled,
          onChange: function onChange() {
            return _this.applyChanges();
          }
        });
        var day = React.createElement(ReCronDay, {
          session: this.state.session,
          cssClassPrefix: this.getCssClassPrefix(),
          disabled: this.props.disabled,
          onChange: function onChange() {
            return _this.applyChanges();
          }
        });
        var map = new Map([[cronCore.Type.SECONDS, second], [cronCore.Type.MINUTES, minute], [cronCore.Type.HOURS, hour], [cronCore.Type.MONTH, month], [cronCore.Type.YEAR, year], [cronCore.Type.DAY, day]]);
        return map.get(this.state.tab.type);
      };

      ReCron.prototype.genTabs = function () {
        var _this = this;

        var className = this.genClassName(['nav', 'nav-tabs', 'mb-2'], ['c-tabs']);
        return React.createElement("ul", {
          className: className,
          role: "tablist",
          "aria-label": "Cron Generator Tabs"
        }, tabs.map(function (t) {
          return _this.genTab(t);
        }));
      };

      ReCron.prototype.genTab = function (item) {
        var _this = this;

        var isActive = this.state.tab === item;
        var className = this.genClassName(['nav-link'], [this.state.tab.type, 'c-tab', isActive ? 'active' : '']);
        return React.createElement("button", {
          key: item.type,
          role: "tab",
          type: "button",
          className: className,
          "aria-selected": isActive,
          tabIndex: isActive ? 0 : -1,
          onClick: function onClick() {
            return _this.changeTab(item);
          }
        }, item.label);
      };

      ReCron.prototype.applyChanges = function () {
        var str = this.getQuartzCron().toString();

        if (this.props.onChange) {
          this.props.onChange(str);
        }
      };

      ReCron.prototype.changeTab = function (item) {
        this.setState({
          tab: item
        });
      };

      return ReCron;
    }(CronBaseComponent);

    exports.ReCron = ReCron;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
