const isArrayVariantShape = (product) => Array.isArray(product?.variants);

const getArrayVariants = (product) => (isArrayVariantShape(product) ? product.variants : []);

export const hasTypeVariants = (product) => {
  if (isArrayVariantShape(product)) return false;
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
  if (isArrayVariantShape(product)) {
    return getArrayVariants(product)
      .map((variant) => String(variant?.quantity || '').trim())
      .filter(Boolean);
  }
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
  if (isArrayVariantShape(product)) {
    if (!quantity) return null;
    const found = getArrayVariants(product).find(
      (variant) => String(variant?.quantity || '').trim() === String(quantity).trim()
    );
    if (!found) return null;
    const price = Number(found.price);
    return Number.isFinite(price) ? price : null;
  }
  if (hasTypeVariants(product)) {
    if (!type || !quantity) return null;
    return product.variants[type]?.[quantity] ?? null;
  }
  if (!quantity) return null;
  return product.variants[quantity] ?? null;
};

export const getStartingPrice = (product) => {
  if (!product?.variants) return product?.price || null;
  if (isArrayVariantShape(product)) {
    const prices = getArrayVariants(product)
      .map((variant) => Number(variant?.price))
      .filter((n) => Number.isFinite(n));
    return prices.length ? Math.min(...prices) : product?.price || null;
  }
  if (Object.keys(product.variants).length === 0) return product?.price || null;
  if (hasTypeVariants(product)) {
    const prices = Object.values(product.variants).flatMap((entry) => Object.values(entry || {}));
    return prices.length ? Math.min(...prices) : product?.price || null;
  }
  const prices = Object.values(product.variants);
  return prices.length ? Math.min(...prices) : product?.price || null;
};

export const getVariantImage = (product, quantity = null) => {
  if (!product) return '';
  if (isArrayVariantShape(product) && quantity) {
    const found = getArrayVariants(product).find(
      (variant) => String(variant?.quantity || '').trim() === String(quantity).trim()
    );
    if (found?.image) return found.image;
  }
  return product.image || '';
};
