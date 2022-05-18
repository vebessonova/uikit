import './RadioGroup.css';

import React, { forwardRef } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { cn } from '../../utils/bem';
import { Radio } from '../Radio/Radio';

import { withDefaultGetters } from './helper';
import {
  RadioGroupComponent,
  radioGroupDefaultDirection,
  radioGroupDefaultSize,
  radioGroupDefaultView,
  radioGroupPropAlignDefault,
  RadioGroupProps,
} from './types';

export const cnRadioGroup = cn('RadioGroup');

function RadioGroupRender(props: RadioGroupProps, ref: React.Ref<HTMLDivElement>) {
  const {
    value = null,
    items,
    getLabel,
    getDisabled,
    onChange,
    name,
    direction = radioGroupDefaultDirection,
    size = radioGroupDefaultSize,
    view = radioGroupDefaultView,
    align = radioGroupPropAlignDefault,
    disabled = false,
    className,
    ...otherProps
  } = withDefaultGetters(props);

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: getLabel,
    callBack: onChange,
    multiple: false,
  });

  return (
    <div {...otherProps} ref={ref} className={cnRadioGroup({ direction, size, view }, [className])}>
      {items.map((item) => (
        <Radio
          align={align}
          key={getLabel(item)}
          label={getLabel(item)}
          size={size}
          view={view}
          name={name}
          disabled={disabled || (!!getDisabled && getDisabled(item))}
          checked={getChecked(item)}
          onChange={({ e }) => getOnChange(item)(e)}
          className={cnRadioGroup('Item')}
        />
      ))}
    </div>
  );
}

export const RadioGroup = forwardRef(RadioGroupRender) as RadioGroupComponent;

export * from './types';
