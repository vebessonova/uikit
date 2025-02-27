import { ClickOutsideHandler } from '../../hooks/useClickOutside/useClickOutside';
import { IconComponent } from '../../icons/Icon/Icon';
import { PropsWithAsAttributes } from '../../utils/types/PropsWithAsAttributes';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { Direction, PopoverPropOffset, Position } from '../Popover/Popover';

export const contextMenuSizes = ['m', 'xs', 's', 'l'] as const;
export type ContextMenuPropSize = typeof contextMenuSizes[number];
export const contextMenuDefaultSize: ContextMenuPropSize = contextMenuSizes[0];

export const contextMenuStatus = ['alert', 'success', 'warning'] as const;
export type ContextMenuStatus = typeof contextMenuStatus[number];
export const contextMenuDefaultStatus: ContextMenuStatus = contextMenuStatus[0];

export const contextMenuPropSubMenuDirections = [
  'rightStartUp',
  'rightStartDown',
  'leftStartUp',
  'leftStartDown',
] as const;
export type ContextMenuPropSubMenuDirection = typeof contextMenuPropSubMenuDirections[number];
export const contextMenuPropDefaultSubMenuDirection: ContextMenuPropSubMenuDirection =
  contextMenuPropSubMenuDirections[0];

export type ContextMenuPropOnClick<ITEM> = (params: {
  e: React.MouseEvent<HTMLDivElement>;
  item: ITEM;
}) => void;

export type ContextMenuGroupDefault = {
  label?: string;
  id: number;
};

export type ContextMenuItemDefault = {
  label: string | number;
  key?: string | number;
  rightSide?: React.ReactNode;
  rightIcon?: IconComponent;
  leftSide?: React.ReactNode;
  leftIcon?: IconComponent;
  subMenu?: ContextMenuItemDefault[];
  status?: ContextMenuStatus;
  disabled?: boolean;
  groupId?: number;
  onClick?: ContextMenuPropOnClick<ContextMenuItemDefault>;
  as?: keyof JSX.IntrinsicElements;
  attributes?: JSX.IntrinsicElements[keyof JSX.IntrinsicElements];
};

export type ContextMenuPropSortGroup = (a: string | number, b: string | number) => number;

export type ContextMenuPropGetItemLabel<ITEM> = (item: ITEM) => string | number;
export type ContextMenuPropGetItemRightSide<ITEM> = (item: ITEM) => React.ReactNode | undefined;
export type ContextMenuPropGetItemLeftSide<ITEM> = (item: ITEM) => React.ReactNode | undefined;
export type ContextMenuPropGetItemSubMenu<ITEM> = (item: ITEM) => ITEM[] | undefined;
export type ContextMenuPropGetItemStatus<ITEM> = (item: ITEM) => ContextMenuStatus | undefined;
export type ContextMenuPropGetItemKey<ITEM> = (item: ITEM) => string | number | undefined;
export type ContextMenuPropGetItemOnClick<ITEM> = (
  item: ITEM,
) => ContextMenuPropOnClick<ITEM> | undefined;
export type ContextMenuPropGetItemDisabled<ITEM> = (item: ITEM) => boolean | undefined;
export type ContextMenuPropGetItemAs<ITEM> = (
  item: ITEM,
) => keyof JSX.IntrinsicElements | undefined;
export type ContextMenuPropGetItemAttributes<ITEM> = (
  item: ITEM,
) => JSX.IntrinsicElements[keyof JSX.IntrinsicElements] | undefined;
export type ContextMenuPropGetItemGroupId<ITEM> = (item: ITEM) => number | undefined;
export type ContextMenuPropGetItemRightIcon<ITEM> = (item: ITEM) => IconComponent | undefined;
export type ContextMenuPropGetItemLeftIcon<ITEM> = (item: ITEM) => IconComponent | undefined;

export type ContextMenuPropGetGroupLabel<GROUP> = (group: GROUP) => string | undefined;
export type ContextMenuPropGetGroupId<GROUP> = (group: GROUP) => number;

type PositioningProps =
  | {
      anchorRef: React.RefObject<HTMLElement>;
      position?: never;
    }
  | {
      anchorRef?: never;
      position: Position;
    };

export type MappersItem<ITEM> = {
  getItemLabel?: ContextMenuPropGetItemLabel<ITEM>;
  getItemRightSide?: ContextMenuPropGetItemRightSide<ITEM>;
  getItemLeftSide?: ContextMenuPropGetItemLeftSide<ITEM>;
  getItemSubMenu?: ContextMenuPropGetItemSubMenu<ITEM>;
  getItemStatus?: ContextMenuPropGetItemStatus<ITEM>;
  getItemDisabled?: ContextMenuPropGetItemDisabled<ITEM>;
  getItemKey?: ContextMenuPropGetItemKey<ITEM>;
  getItemOnClick?: ContextMenuPropGetItemOnClick<ITEM>;
  getItemAs?: ContextMenuPropGetItemAs<ITEM>;
  getItemAttributes?: ContextMenuPropGetItemAttributes<ITEM>;
  getItemGroupId?: ContextMenuPropGetItemGroupId<ITEM>;
  getItemLeftIcon?: ContextMenuPropGetItemLeftIcon<ITEM>;
  getItemRightIcon?: ContextMenuPropGetItemRightIcon<ITEM>;
};

export type MappersGroup<GROUP> = {
  getGroupLabel?: ContextMenuPropGetGroupLabel<GROUP>;
  getGroupId?: ContextMenuPropGetGroupId<GROUP>;
};

export type Level<ITEM> = {
  items: ITEM[];
  activeItem?: string;
  direction?: Direction;
  possibleDirections?: readonly Direction[];
  offset?: number;
} & PositioningProps;

export type AddLevel<ITEM> = (params: {
  level: number;
  items: ITEM[];
  anchorRef?: React.RefObject<HTMLElement>;
  activeItem: string;
}) => void;

export type ContextMenuProps<
  ITEM = ContextMenuItemDefault,
  GROUP = ContextMenuGroupDefault
> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    size?: ContextMenuPropSize;
    direction?: Direction;
    offset?: PopoverPropOffset;
    groups?: GROUP[];
    sortGroup?: ContextMenuPropSortGroup;
    onItemClick?: ContextMenuPropOnClick<ITEM>;
    possibleDirections?: readonly Direction[];
    subMenuDirection?: ContextMenuPropSubMenuDirection;
    spareDirection?: Direction;
    onSetDirection?: (direction: Direction) => void;
    onClickOutside?: ClickOutsideHandler;
    isOpen?: boolean;
  } & MappersItem<ITEM> &
    MappersGroup<GROUP> &
    PositioningProps,
  HTMLDivElement
> &
  (GROUP extends { id: ContextMenuGroupDefault['id'] | unknown }
    ? {}
    : { getGroupId: ContextMenuPropGetGroupId<GROUP> }) &
  (ITEM extends { label: ContextMenuItemDefault['label'] }
    ? {}
    : { getItemLabel: ContextMenuPropGetItemLabel<ITEM> });

export type ContextMenuComponent = <ITEM = ContextMenuItemDefault, GROUP = ContextMenuGroupDefault>(
  props: ContextMenuProps<ITEM, GROUP>,
) => React.ReactElement | null;

export type ContextMenuLevelProps<ITEM, GROUP> = Omit<
  ContextMenuProps<ITEM, GROUP>,
  'subMenuDirection' | 'onClickOutside' | keyof MappersItem<ITEM> | keyof MappersGroup<GROUP>
> & {
  levelDepth: number;
  addLevel: AddLevel<ITEM>;
  deleteLevel: (level: number) => void;
  activeItem?: string;
  onSetDirection?: (direction: Direction) => void;
  hoveredParenLevel: number;
  setHoveredParenLevel: (level: number) => void;
} & Required<MappersItem<ITEM>> &
  Required<MappersGroup<GROUP>>;

export type ContextMenuLevelComponent = <ITEM, GROUP>(
  props: ContextMenuLevelProps<ITEM, GROUP>,
  ref: React.Ref<HTMLElement>,
) => React.ReactElement | null;

export type ContextMenuItemProps<
  AS extends keyof JSX.IntrinsicElements = 'div'
> = PropsWithAsAttributes<
  Omit<ContextMenuItemDefault, 'onClick' | 'attributes'> & {
    size?: ContextMenuPropSize;
    active: boolean;
    withSubMenu: boolean;
  },
  AS
> &
  React.RefAttributes<HTMLDivElement>;

export type ContextMenuItemComponent = <AS extends keyof JSX.IntrinsicElements = 'div'>(
  props: ContextMenuItemProps<AS>,
  ref: React.Ref<HTMLElement>,
) => React.ReactElement | null;

export type GetLevelsParams<ITEM> = {
  levels: Level<ITEM>[];
  items: ITEM[];
  getItemSubMenu: ContextMenuPropGetItemSubMenu<ITEM>;
  getItemKey: ContextMenuPropGetItemKey<ITEM>;
  getItemLabel: ContextMenuPropGetItemLabel<ITEM>;
};
