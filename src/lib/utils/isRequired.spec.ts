import test from 'ava';
import { TypeKind } from 'graphql';

import isRequired from './isRequired';

test('returns the correct type for SCALAR types', (t) => {
  t.false(
    isRequired({
      name: 'foo',
      kind: TypeKind.SCALAR,
    })
  );
});

test('returns the correct type for NON_NULL types', (t) => {
  t.true(
    isRequired({
      kind: TypeKind.NON_NULL,
      ofType: { name: 'foo', kind: TypeKind.SCALAR },
    })
  );
});

test('returns the correct type for LIST types', (t) => {
  t.false(
    isRequired({
      kind: TypeKind.LIST,
      ofType: { name: 'foo', kind: TypeKind.SCALAR },
    })
  );
});

test('returns the correct type for NON_NULL LIST types', (t) => {
  t.true(
    isRequired({
      kind: TypeKind.NON_NULL,
      ofType: {
        kind: TypeKind.LIST,
        ofType: { name: 'foo', kind: TypeKind.SCALAR },
      },
    })
  );
});
