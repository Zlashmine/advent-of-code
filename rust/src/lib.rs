pub mod template;

pub trait VecRemoveByIndex<T> {
    fn remove_by_index(&self, index: usize) -> Vec<T>;
}

impl<T: Clone> VecRemoveByIndex<T> for Vec<T> {
    fn remove_by_index(&self, index: usize) -> Vec<T> {
        self.iter()
            .enumerate()
            .filter_map(|(i, v)| if i != index { Some(v.clone()) } else { None })
            .collect()
    }
}

pub fn remove_by_index<T: Clone>(slice: &[T], index: usize) -> Vec<T> {
    slice
        .iter()
        .enumerate()
        .filter_map(|(i, v)| if i != index { Some(v.clone()) } else { None })
        .collect()
}
