import { extendTheme } from '@chakra-ui/react';

// CSS is the source of visual values. Chakra names expose the same roles.
const css = (name: string) => `var(--${name})`;
const focus = { outline: `${css('focus-width')} solid ${css('focus-color')}`, outlineOffset: css('focus-offset') };
const field = {
  borderColor: 'border.default',
  bg: 'surface.panel',
  color: 'text.primary',
  borderRadius: 'control',
  _placeholder: { color: 'text.muted' },
  _hover: { borderColor: 'border.interactive' },
  _focusVisible: focus,
  _invalid: { borderColor: 'status.danger', boxShadow: 'none' },
};

export const theme = extendTheme({
  config: { initialColorMode: 'light', useSystemColorMode: false },
  breakpoints: { sm: '640px', md: '1024px', lg: '1440px', xl: '1920px', '2xl': '2560px' },
  fonts: { body: css('font-body'), heading: css('font-heading') },
  fontSizes: {
    label: css('font-size-label'), body: css('font-size-body'), caption: css('font-size-caption'),
    display: css('fs-6xl'), title: css('fs-4xl'), section: css('fs-3xl'),
  },
  lineHeights: { reading: css('lh-relaxed'), display: css('lh-tight') },
  letterSpacings: { editorial: css('ls-wider') },
  colors: {
    surface: { page: css('surface-page'), panel: css('surface-panel'), subtle: css('surface-subtle'), muted: css('surface-muted'), hover: css('surface-hover'), inverse: css('surface-inverse') },
    text: { primary: css('text-primary'), secondary: css('text-secondary'), muted: css('text-muted'), inverse: css('text-inverse') },
    border: { default: css('border-default'), subtle: css('border-subtle'), interactive: css('border-interactive') },
    action: { background: css('action-background'), hover: css('action-hover'), text: css('action-text') },
    status: { success: css('status-success'), danger: css('status-danger'), warning: css('status-warning'), info: css('status-info') },
    feedback: { success: css('status-success-surface'), danger: css('status-danger-surface'), warning: css('status-warning-surface'), info: css('status-info-surface') },
  },
  semanticTokens: { colors: { 'chakra-body-text': { default: 'text.primary' }, 'chakra-body-bg': { default: 'surface.page' }, 'chakra-border-color': { default: 'border.default' }, 'chakra-placeholder-color': { default: 'text.muted' } } },
  // Preserve Chakra's numeric spacing scale; named keys bridge the editorial scale.
  space: { gutter: css('layout-gutter'), section: css('layout-section'), stack: css('layout-stack') },
  sizes: { reading: css('layout-reading'), content: css('layout-content'), wide: css('layout-wide'), page: css('layout-page'), form: css('layout-form'), control: css('control-height') },
  radii: { control: css('control-radius'), panel: css('panel-radius'), pill: css('radius-pill') },
  shadows: { panel: css('shadow-panel'), overlay: css('shadow-overlay'), outline: css('focus-ring') },
  styles: { global: { body: { bg: 'surface.page', color: 'text.primary', fontFamily: 'body' } } },
  components: {
    Heading: { baseStyle: { fontFamily: 'heading', fontWeight: 'normal', color: 'text.primary' } },
    Button: {
      baseStyle: { borderRadius: 'control', fontWeight: 'medium', _focusVisible: focus, _disabled: { opacity: css('opacity-disabled'), cursor: 'not-allowed' } },
      variants: {
        primary: { bg: 'action.background', color: 'action.text', _hover: { bg: 'action.hover', _disabled: { bg: 'action.background' } }, _active: { bg: 'action.hover' } },
        secondary: { border: '1px solid', borderColor: 'border.default', bg: 'surface.panel', color: 'text.primary', _hover: { bg: 'surface.subtle' } },
      },
    },
    Input: { variants: { outline: { field } } },
    Select: { variants: { outline: { field } } },
    Textarea: { variants: { outline: field } },
    Table: { baseStyle: { th: { fontFamily: 'body', color: 'text.muted' }, td: { fontVariantNumeric: 'tabular-nums' } } },
    Link: { baseStyle: { _focusVisible: focus }, variants: { underline: {
      display: 'inline-block', position: 'relative',
      _after: { content: '""', position: 'absolute', width: '100%', transform: 'scaleX(0)', height: '1.5px', bottom: 0, left: 0, transformOrigin: 'bottom right', backgroundColor: 'text.primary', transition: `transform ${css('dur-fast')} ${css('ease-out')}` },
      _hover: { textDecoration: 'none', _after: { transform: 'scaleX(1)', transformOrigin: 'bottom left' } },
    } } },
  },
});
