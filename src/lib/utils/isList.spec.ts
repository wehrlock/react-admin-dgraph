import test from 'ava';
import { TypeKind } from 'graphql';

import isList from './isList';

test('returns the correct type for SCALAR types', (t) => {
  t.false(isList({ name: 'foo', kind: TypeKind.SCALAR }));
});

test('returns the correct type for NON_NULL types', (t) => {
  t.false(
    isList({
      kind: TypeKind.NON_NULL,
      ofType: { name: 'foo', kind: TypeKind.SCALAR },
    })
  );
});

test('returns the correct type for LIST types', (t) => {
  t.true(
    isList({
      kind: TypeKind.LIST,
      ofType: { name: 'foo', kind: TypeKind.SCALAR },
    })
  );
});

test('returns the correct type for NON_NULL LIST types', (t) => {
  t.true(
    isList({
      kind: TypeKind.NON_NULL,
      ofType: {
        kind: TypeKind.LIST,
        ofType: { name: 'foo', kind: TypeKind.SCALAR },
      },
    })
  );
});
