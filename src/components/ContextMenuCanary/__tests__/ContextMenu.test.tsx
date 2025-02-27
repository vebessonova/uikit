import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { exampleItems as items, groups } from '../__mocks__/mock.data';
import { IconAllDone } from '../../../icons/IconAllDone/IconAllDone';
import { cn } from '../../../utils/bem';
import { cnText } from '../../Text/Text';
import { ContextMenu } from '../ContextMenuCanary';
import { cnContextMenuLevel } from '../ContextMenuLevel/ContextMenuLevel';
import { ContextMenuGroupDefault, ContextMenuItemDefault, ContextMenuProps } from '../types';

const testId = 'ContextMenuCanary';
const additionalClass = 'additionalClass';

const cnContextMenuItem = cn('ContextMenuItemCanary');

const renderComponent = (
  props: ContextMenuProps<ContextMenuItemDefault, ContextMenuGroupDefault> | {},
) => {
  return render(
    <>
      <ContextMenu
        {...props}
        isOpen
        anchorRef={undefined}
        position={{ x: 0, y: 0 }}
        items={items}
        className={additionalClass}
        data-testid={testId}
      />
    </>,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}

function getItems() {
  return getRender().querySelectorAll(`.${cnContextMenuItem()}`);
}

function getItem(index = 0) {
  return getItems()[index];
}

function getSide(index = 0, sideIndex = 0) {
  return getItem(index).querySelectorAll(`.${cnContextMenuItem('Slot')}`)[sideIndex];
}
function getIcon(index = 0, sideIndex = 0) {
  return getSide(index, sideIndex).querySelectorAll('.Icon')[0];
}

function getGroups() {
  return getRender().querySelectorAll(`.${cnContextMenuLevel('Group')}`);
}

function getGroup(index = 0) {
  return getGroups()[index];
}

function getGroupHeader(index = 0) {
  return getGroup(index).querySelector(`.${cnContextMenuLevel('Header')}`);
}

describe('Компонент ContextMenu', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка items', () => {
      it('количество совпадает с передаваемым', () => {
        renderComponent({});
        expect(getItems().length).toEqual(items.length);
      });
    });
    describe('проверка getItemLabel', () => {
      it('label совпадает', () => {
        renderComponent({
          getItemLeftSide: () => undefined,
          getItemRightSide: () => undefined,
        });
        expect(getItem().textContent).toEqual(items[0].label);
      });
    });
    describe('проверка getGroupId', () => {
      it('количество групп совпадает', () => {
        renderComponent({ groups });
        expect(getGroups().length).toEqual(groups.length);
      });
    });
    describe('проверка getGroupLabel', () => {
      it('label совпадает', () => {
        renderComponent({ groups });
        expect(getGroupHeader()?.textContent).toEqual(groups[0].label);
      });
    });
    describe('проверка getItemOnClick', () => {
      it('клик по элементу должен вызвать callback', () => {
        const handleChange = jest.fn();

        renderComponent({
          onItemClick: handleChange,
          getItemSubMenu: () => undefined,
        });

        fireEvent.click(getItem());

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
      });
    });
    describe('проверка getItemStatus', () => {
      it('элементу присвоился нужный модификатор', () => {
        renderComponent({});

        expect(getItem()).toHaveClass(cnText({ view: items[0].status }));
      });
    });
    describe('проверка getItemDisabled', () => {
      it('элементу присвоился нужный модификатор и onClick не отрабатывает', () => {
        const handleChange = jest.fn();

        renderComponent({
          getItemDisabled: () => true,
          getItemOnClick: (item) => () => handleChange(item),
        });

        expect(getItem()).toHaveClass(cnContextMenuItem({ disabled: true }));

        fireEvent.click(getItem());
        expect(handleChange).toHaveBeenCalledTimes(0);
      });
    });
    describe('проверка getItemLeftSide', () => {
      it('side cлева отобразился', () => {
        renderComponent({
          getItemLeftIcon: () => undefined,
          getItemLeftSide: () => 'test',
        });

        expect(getSide()).toHaveClass(cnContextMenuItem('Slot', { position: 'left' }));
      });
    });
    describe('проверка getItemRightSide', () => {
      it('side справа отобразился', () => {
        renderComponent({
          getItemRightIcon: () => undefined,
          getItemRightSide: () => 'test',
        });

        expect(getSide(0, 2)).toHaveClass(cnContextMenuItem('Slot', { position: 'right' }));
      });
    });
    describe('проверка getItemLeftIcon', () => {
      it('icon cлева отобразился', () => {
        renderComponent({
          getItemLeftSide: () => undefined,
          getItemLeftIcon: () => IconAllDone,
        });

        expect(getIcon(0, 0)).toHaveClass('IconAllDone');
      });
    });
    describe('проверка getItemRightIcon', () => {
      it('icon справа отобразился', () => {
        renderComponent({
          getItemRightSide: () => undefined,
          getItemRightIcon: () => IconAllDone,
        });

        expect(getIcon(0, 2)).toHaveClass('IconAllDone');
      });
    });
    describe('проверка getItemAs', () => {
      it('icon справа отобразился', () => {
        renderComponent({
          getItemAs: () => 'button',
        });

        expect(getItem().tagName).toEqual('BUTTON');
      });
    });
    describe('проверка className', () => {
      it('дополнительный класс применяется', () => {
        renderComponent({});

        expect(getRender()).toHaveClass(additionalClass);
      });
    });
  });
});
