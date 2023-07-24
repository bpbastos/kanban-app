// useParse.js
import { ref,toValue,watch,inject } from 'vue';

export async function useParseFind(className, where) {
  const Parse = inject("Parse");
  const data = ref([]);
  const error = ref(null);

  const refresh = async() => {
    const query = Parse.Query.fromJSON(toValue(className),toValue(where))
    try {
      const result = await query.find();
      result.forEach(obj => {
        data.value.push(obj.toJSON())
      });       
    } catch (err) {
      error.value = err;
    }
  }

  if ((toValue(className) && typeof toValue(className) === 'string') && 
      (toValue(where) && typeof toValue(where) === 'object')) 
  {

    watch([className, where], () => {
      data.value = []
      refresh();
    }, { immediate: true });    
    //await refresh(toValue(reactiveWhere));
  }

  return { data, error, refresh };
}

export async function useParseFirst(className, where) {
  const Parse = inject("Parse");
  const data = ref(null);
  const error = ref(null);

  const refresh = async() => {
    const query = Parse.Query.fromJSON(toValue(className),toValue(where))
    try {
      const result = await query.first();
      data.value = result.toJSON();
    } catch (err) {
      error.value = err;
    }
  }

  if ((toValue(className) && typeof toValue(className) === 'string') && 
      (toValue(where) && typeof toValue(where) === 'object')) 
  {
    //watch([className, where], () => {
    //  data.value = null
      refresh();
    //}, { immediate: true });    
  }

  return { data, error, refresh };
}


export async function useParseSave(className, objData) {
  const Parse = inject("Parse");
  const data = ref(null);
  const error = ref(null);    
  
  const save = async() => {
    try {
      const obj = new Parse.Object(className, objData)
      const result = await obj.save();
      data.value = result.toJSON()
    } catch (err) {
      error.value = err;
    }
  }
  if ((className && typeof className === 'string') && 
      (objData && typeof objData === 'object')) 
  {
    await save()
  }

  return { data, error };
}

export function useParseDelete(className, objectId) {
  const Parse = inject("Parse");
  const data = ref(null);
  const error = ref(null);  

  const deleteObj = async () => {
    const object = new Parse.Object(className);
    object.set('objectId', objectId);
    try {
      const result = await object.destroy();  
      data.value = result.toJSON();
    } catch (err) {
      error.value = err;
    }
    
  }

  deleteObj()

  return { data, error };
}
