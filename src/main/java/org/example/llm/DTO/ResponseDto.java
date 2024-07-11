package org.example.llm.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.*;

@Data
@AllArgsConstructor(staticName = "set")
public class ResponseDto<L> implements List<Map<String, Object>> {
    private boolean result;
    private String message;
    private static Data data;

    public  static ResponseDto setSuccess(String message) {
        return ResponseDto.set(true, message);
    }

    public static  ResponseDto setFailed(String message)
    {
        return ResponseDto.set(false, message);
    }

    public static <data> ResponseDto setSuccessData(String message) {
        return ResponseDto.set(true, message);
    }

    public static <data> ResponseDto setFailedData(String message) {
        return ResponseDto.set(false, message);
    }

    @Override
    public int size() {
        return 0;
    }

    @Override
    public boolean isEmpty() {
        return false;
    }

    @Override
    public boolean contains(Object o) {
        return false;
    }

    @Override
    public Iterator<Map<String, Object>> iterator() {
        return null;
    }

    @Override
    public Object[] toArray() {
        return new Object[0];
    }

    @Override
    public <T> T[] toArray(T[] a) {
        return null;
    }

    @Override
    public boolean add(Map<String, Object> stringObjectMap) {
        return false;
    }

    @Override
    public boolean remove(Object o) {
        return false;
    }

    @Override
    public boolean containsAll(Collection<?> c) {
        return false;
    }

    @Override
    public boolean addAll(Collection<? extends Map<String, Object>> c) {
        return false;
    }

    @Override
    public boolean addAll(int index, Collection<? extends Map<String, Object>> c) {
        return false;
    }

    @Override
    public boolean removeAll(Collection<?> c) {
        return false;
    }

    @Override
    public boolean retainAll(Collection<?> c) {
        return false;
    }

    @Override
    public void clear() {

    }

    @Override
    public Map<String, Object> get(int index) {
        return Map.of();
    }

    @Override
    public Map<String, Object> set(int index, Map<String, Object> element) {
        return Map.of();
    }

    @Override
    public void add(int index, Map<String, Object> element) {

    }

    @Override
    public Map<String, Object> remove(int index) {
        return Map.of();
    }

    @Override
    public int indexOf(Object o) {
        return 0;
    }

    @Override
    public int lastIndexOf(Object o) {
        return 0;
    }

    @Override
    public ListIterator<Map<String, Object>> listIterator() {
        return null;
    }

    @Override
    public ListIterator<Map<String, Object>> listIterator(int index) {
        return null;
    }

    @Override
    public List<Map<String, Object>> subList(int fromIndex, int toIndex) {
        return List.of();
    }
}
