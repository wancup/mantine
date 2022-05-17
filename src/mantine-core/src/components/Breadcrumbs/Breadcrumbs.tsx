import React, { forwardRef } from 'react';
import { DefaultProps, Selectors, useMantineDefaultProps } from '@mantine/styles';
import { isElement } from '@mantine/utils';
import { Text } from '../Text';
import { Box } from '../Box';
import useStyles from './Breadcrumbs.styles';

export type BreadcrumbsStylesNames = Selectors<typeof useStyles>;

export interface BreadcrumbsProps
  extends DefaultProps<BreadcrumbsStylesNames>,
    React.ComponentPropsWithoutRef<'div'> {
  /** Separator between breadcrumbs */
  separator?: React.ReactNode;

  /** React nodes that should be separated */
  children: React.ReactNode;
}

const defaultProps: Partial<BreadcrumbsProps> = {
  separator: '/',
};

export const Breadcrumbs = forwardRef<HTMLDivElement, BreadcrumbsProps>(
  (props: BreadcrumbsProps, ref) => {
    const { className, children, separator, classNames, styles, ...others } =
      useMantineDefaultProps('Breadcrumbs', defaultProps, props);

    const { classes, cx } = useStyles(null, { classNames, styles, name: 'Breadcrumbs' });

    const items = React.Children.toArray(children).reduce(
      (acc: React.ReactNode[], child: React.ReactElement, index, array) => {
        const item = isElement(child) ? (
          React.cloneElement(child, {
            className: cx(classes.breadcrumb, child.props?.className),
            key: index,
          })
        ) : (
          <div className={classes.breadcrumb} key={index}>
            {child}
          </div>
        );

        acc.push(item);

        if (index !== array.length - 1) {
          acc.push(
            <Text size="sm" className={classes.separator} key={`separator-${index}`}>
              {separator}
            </Text>
          );
        }

        return acc;
      },
      []
    );

    return (
      <Box className={cx(classes.root, className)} ref={ref} {...others}>
        {items}
      </Box>
    );
  }
);

Breadcrumbs.displayName = '@mantine/core/Breadcrumbs';