export const hasTypeVariants = (product) => {
  if (!product?.variants || typeof product.variants !== 'object') return false;
  const keys = Object.keys(product.variants);
  if (keys.length === 0) return false;
  const firstValue = product.variants[keys[0]];
  return typeof firstValue === 'object' && firstValue !== null;
};

export const getVariantTypes = (product) => {
  if (!hasTypeVariants(product)) return [];
  return Object.keys(product.variants);
};

export const getQuantities = (product, type = null) => {
  if (!product?.variants) return [];
  if (hasTypeVariants(product) && type) {
    return Object.keys(product.variants[type] || {});
  }
  if (!hasTypeVariants(product)) {
    return Object.keys(product.variants);
  }
  return [];
};

export const getPrice = (product, type = null, quantity = null) => {
  if (!product?.variants) return null;
  if (hasTypeVariants(product)) {
    if (!type || !quantity) return null;
    return product.variants[type]?.[quantity] ?? null;
  }
  if (!quantity) return null;
  return product.variants[quantity] ?? null;
};

export const getStartingPrice = (product) => {
  if (!product?.variants || Object.keys(product.variants).length === 0) return product?.price || null;
  if (hasTypeVariants(product)) {
    const prices = Object.values(product.variants).flatMap((entry) => Object.values(entry || {}));
    return prices.length ? Math.min(...prices) : product?.price || null;
  }
  const prices = Object.values(product.variants);
  return prices.length ? Math.min(...prices) : product?.price || null;
};
