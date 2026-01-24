import asyncio
from functools import wraps
from cachetools import TTLCache
from cachetools.keys import hashkey

# Cache with 100 items limit, 60 minutes TTL
response_cache = TTLCache(maxsize=100, ttl=3600)

def async_cache(cache):
    """
    Decorator to cache async function responses.
    """
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Create a cache key based on positional and keyword arguments
            # We exclude 'self' from the key if it's a method by not modifying args handling
            # hashkey handles *args and **kwargs. 
            # Note: If valid usage involves 'self' (instance methods), hashkey includes it.
            # For services that are singletons or stateless, this is fine.
            key = hashkey(*args, **kwargs)
            
            if key in cache:
                return cache[key]
            
            # Call the async function
            result = await func(*args, **kwargs)
            
            # Store result in cache
            cache[key] = result
            return result
        return wrapper
    return decorator
